import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../model/user';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {Utilisateur} from '../model/utilisateur';

@Injectable()
export class ConnexionService {
  static tokenName = 'worldline_token';
  public static utilisateurUsername = 'utilisateur_username';
  static accueil = 'accueil';
  static auth = 'auth';
  static isAuthenticated = 'isAuthenticated';

  private static _URL = 'http://localhost:8080/';
  private static _AUTHENTICATE = 'authenticate';

  utilisateurs: Utilisateur[] = [];
  constructor(public jwtHelper: JwtHelperService,
              private httpClient: HttpClient,
              private router: Router) {
  }
  getAccueil(): string{
    return ConnexionService.accueil;
  }

  getUtilisateurUsername(): string{
    return ConnexionService.utilisateurUsername;
  }

  doConnexion(user: User): Observable<string> {
    const url = ConnexionService._URL + ConnexionService._AUTHENTICATE;
    const token = this.httpClient.post<string>(url, user).pipe(
      tap(response => {
        this.populateLocalVariables(response, user.username);
        return response;
      },
          err => {
        console.log(err);
      })
    );
    return token;
  }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem(ConnexionService.tokenName) || '';
    if (token.length < 10){
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
  redirectTo(page: string): void {
    this.router.navigate([page]);
  }
  deconnection(): void {
    localStorage.removeItem(ConnexionService.tokenName);
    this.redirectTo(ConnexionService.auth);
  }
  populateLocalVariables(response: any, username: string): void {
    localStorage.setItem(ConnexionService.tokenName, JSON.stringify(response));
    localStorage.setItem(ConnexionService.utilisateurUsername, username);
  }
  getItemFromLocalStorage(itemName: string): any {
    return localStorage.getItem(itemName);
  }

  recupererIdentifiants(login: string, email: string): void {

  }
}
