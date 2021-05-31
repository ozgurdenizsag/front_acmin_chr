import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../model/user';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {Utilisateur} from '../model/utilisateur';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable()
export class ConnexionService {
  static tokenName = 'worldline_token';
  static accueil = 'accueil';
  static auth = 'auth';
  static isAuthenticated = 'isAuthenticated';
  utilisateurs: Utilisateur[] = [];
  constructor(public jwtHelper: JwtHelperService,
              private httpClient: HttpClient,
              private router: Router) {
  }
  getAccueil(): string{
    return ConnexionService.accueil;
  }

  doConnexion(user: User): Observable<string> {
    const token = this.httpClient.post<string>('http://localhost:8080/authenticate', user).pipe(
      tap(response => {
        this.populateLocalVariables(response);
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
  populateLocalVariables(response: any): void {
    localStorage.setItem(ConnexionService.tokenName, JSON.stringify(response));
  }
  getItemFromLocalStorage(itemName: string): any {
    return localStorage.getItem(itemName);
  }
}
