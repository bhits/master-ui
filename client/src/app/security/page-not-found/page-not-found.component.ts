import {Component, OnInit} from "@angular/core";
import {SessionStorageService} from "src/app/security/shared/session-storage.service";

@Component({
  selector: 'c2s-page-not-found',
  templateUrl: 'page-not-found.component.html',
  styleUrls: ['page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  private USER_PREFERRED_LOCALE_KEY: string = 'user-preferred-locale';

  constructor(private sessionStorageService: SessionStorageService) {
  }

  ngOnInit() {
  }
}
