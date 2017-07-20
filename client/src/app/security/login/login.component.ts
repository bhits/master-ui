import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../shared/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../shared/validation.service";
import {TokenService} from "../shared/token.service";
import {CustomTranslateService} from "../../core/custom-translate.service";
import {ProfileService} from "../shared/profile.service";
import {UmsProfile} from "../shared/ums-profile.model";
import {Profile} from "../../core/profile.model";
import {UtilityService} from "../../shared/utility.service";
import {Role} from "../shared/role.model";
import {ActivatedRoute} from "@angular/router";
import {Credentials} from "../shared/credentials.model";

@Component({
  selector: 'c2s-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public passwordInputType: string = "password";
  loginForm: FormGroup;
  showLoginBackendError: boolean = false;
  public roles: Role[];

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private validationService: ValidationService,
              private tokenService: TokenService,
              private customTranslateService: CustomTranslateService,
              private profileService: ProfileService,
              private utilityService: UtilityService,
              private route: ActivatedRoute) {

    this.loginForm = formBuilder.group({
      'role': [null, Validators.required],
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit() {
      this.roles = this.route.snapshot.data['roles'];
  }

  login(value: any): void {
    this.authenticationService.login(new Credentials( value.username, value.password, value.role))
      .toPromise()
      .then(response => {
        this.showLoginBackendError = false;
        console.log(response);
        // this.authenticationService.onLoginSuccess(response);
        // this.authenticationService.getUserProfile()
        //   .subscribe(
        //     (uaaProfile) => {
        //       let profile = this.tokenService.createProfileObject(uaaProfile);
        //       this.tokenService.storeUserProfile(profile);
        //       this.getUMSProfileAndSetDefaultLanguage(profile);
        //     }
        //     ,
        //     (error) => this.handleLoginError
        //   );
      }).catch(error => {
      console.log(error);
      this.showLoginBackendError = true;
    })
  }

  isValidForm(formgroup: FormGroup) {
    return this.validationService.isValidForm(formgroup);
  }

  getUMSProfileAndSetDefaultLanguage(uaaProfile: Profile) {
    this.profileService.getUMSProfile().subscribe(
      (profile: UmsProfile) => {
        let localesCode: string[] = this.utilityService.getSupportedLocaleCode(profile.supportedLocales);
        this.customTranslateService.addSupportedLanguages(localesCode);
        this.customTranslateService.setDefaultLanguage(profile.userLocale);
        this.profileService.setProfileInSessionStorage(profile);
        this.authenticationService.onGetUserProfileSuccess(uaaProfile);
      },
      this.handleLoginError
    )
  }

  handleLoginError(error: any) {
    this.tokenService.deleteAccessToken();
    this.showLoginBackendError = true;
    console.log(error)
  }

  public getInputType(inputType: string) {
    this.passwordInputType = inputType;
  }
}
