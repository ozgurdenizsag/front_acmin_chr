import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ConnexionService} from './services/connexion-service';
import {AuthGuard} from './services/auth-guard.service';
import { AccesAuthComponent } from './acces-auth/acces-auth.component';

import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import { AdminGestionComponent } from './admin/admin-gestion/admin-gestion.component';
import { AccueilComponent } from './accueil/accueil.component';
import {ForbiddenPageComponent} from './exception/forbidden-page/forbidden-page.component';
import {NotFoundComponent} from './exception/not-found/not-found.component';
import {ConnexionComponent} from './authentification/connexion/connexion.component';
import {DeconnectionComponent} from './authentification/deconnection/deconnection.component';
import {UtilisateurService} from './services/utilisateur-service';
import { UtilisateurGestionComponent } from './admin/utilisateur-gestion/utilisateur-gestion.component';
import { SingleUtilisateurGestionComponent } from './admin/single-utilisateur-gestion/single-utilisateur-gestion.component';
import {MyErrorHandler} from './exception/my-error-handler';

const appRoutes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'accueil', component: AccueilComponent},
  { path: 'auth', component: ConnexionComponent},
  { path: 'access', canActivate: [AuthGuard], component: AccesAuthComponent},
  { path: 'deconnection', canActivate: [AuthGuard], component: DeconnectionComponent},
  { path: 'directeur-page', canActivate: [AuthGuard], component: AdminGestionComponent},
  { path: 'utilisateur-gestion', canActivate: [AuthGuard], component: SingleUtilisateurGestionComponent},
  { path: 'forbidden-page', component: ForbiddenPageComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'not-found'},
];

// tslint:disable-next-line:typedef
export function tokenGetter() {
  return localStorage.getItem(ConnexionService.tokenName);
}

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AccesAuthComponent,
    NotFoundComponent,
    ForbiddenPageComponent,
    AdminGestionComponent,
    DeconnectionComponent,
    AccueilComponent,
    UtilisateurGestionComponent,
    SingleUtilisateurGestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: [''],
      },
    }),
  ],
  providers: [
    HttpClientModule,
    ConnexionService,
    UtilisateurService,
    AuthGuard,
    JwtHelperService,
    {
      provide: ErrorHandler,
      useClass: MyErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
