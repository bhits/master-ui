import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {PageNotFoundComponent} from "./security/page-not-found/page-not-found.component";

const appRoutes: Routes = [
  {
    path: '**',
    pathMatch: 'full' ,
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
