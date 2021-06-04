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
import {UtilisateurService} from './services/utilisateur-service';
import { UtilisateurGestionComponent } from './admin/utilisateur-gestion/utilisateur-gestion.component';
import { SingleUtilisateurGestionComponent } from './admin/single-utilisateur-gestion/single-utilisateur-gestion.component';
import {MyErrorHandler} from './exception/my-error-handler';
import { MonEspaceComponent } from './personnel/mon-espace/mon-espace.component';
import { RecuperationIdentifiantsComponent } from './personnel/recuperation-identifiants/recuperation-identifiants.component';
import {VariablesService} from './services/variables-service';
import { RoleGestionComponent } from './admin/role-gestion/role-gestion.component';
import { RoleListeComponent } from './admin/role-liste/role-liste.component';

const appRoutes: Routes = [
  { path: VariablesService.DEFAULT_PAGE, component: AccueilComponent},
  { path: VariablesService.ACCUEIL, component: AccueilComponent},
  { path: VariablesService.AUTH, component: ConnexionComponent},
  { path: VariablesService.RECUPERATION_IDENTIFIANT, component: RecuperationIdentifiantsComponent},
  { path: 'access', canActivate: [AuthGuard], component: AccesAuthComponent},
  { path: VariablesService.ROLE_GESTION, canActivate: [AuthGuard], component: RoleGestionComponent},
  { path: VariablesService.DIRECTEUR_PAGE, canActivate: [AuthGuard], component: AdminGestionComponent},
  { path: VariablesService.UTILISATEUR_GESTION, canActivate: [AuthGuard], component: SingleUtilisateurGestionComponent},
  { path: VariablesService.MON_ESPACE, canActivate: [AuthGuard], component: MonEspaceComponent},
  { path: VariablesService.FORBIDDEN_PAGE, component: ForbiddenPageComponent},
  { path: VariablesService.NOT_FOUND, component: NotFoundComponent},
  { path: VariablesService.RONDOM_URL, redirectTo: 'not-found'},
];

// tslint:disable-next-line:typedef
export function tokenGetter() {
  return localStorage.getItem(VariablesService.tokenName);
}

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AccesAuthComponent,
    NotFoundComponent,
    ForbiddenPageComponent,
    AdminGestionComponent,
    AccueilComponent,
    UtilisateurGestionComponent,
    SingleUtilisateurGestionComponent,
    MonEspaceComponent,
    RecuperationIdentifiantsComponent,
    RoleGestionComponent,
    RoleListeComponent
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
        allowedDomains: [''],
        disallowedRoutes: [''],
      },
    }),
  ],
  providers: [
    HttpClientModule,
    ConnexionService,
    UtilisateurService,
    VariablesService,
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
