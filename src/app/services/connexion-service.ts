import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../model/user';
import { Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {VariablesService} from './variables-service';
import {AppComponent} from '../app.component';

@Injectable()
export class ConnexionService {
  constructor(public jwtHelper: JwtHelperService,
              private httpClient: HttpClient,
              private router: Router) {
  }


  doConnexion(user: User): Observable<string> {
    const url = VariablesService._URL + VariablesService._AUTHENTICATE;
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
    const token = localStorage.getItem(VariablesService.tokenName) || '';
    if (token.length < 10){
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
  redirectTo(page: string): void {
    this.router.navigate([page]);
  }
  deconnection(): void {
    localStorage.removeItem(VariablesService.tokenName);
    localStorage.removeItem(VariablesService.utilisateurUsername);
    this.redirectTo(VariablesService.AUTH);
  }
  populateLocalVariables(response: any, username: string): void {
    localStorage.setItem(VariablesService.tokenName, JSON.stringify(response));
    localStorage.setItem(VariablesService.utilisateurUsername, username);
    window.location.reload();
  }
}
