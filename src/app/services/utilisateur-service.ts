import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Utilisateur} from '../model/utilisateur';
import {ConnexionService} from './connexion-service';
import {User} from '../model/user';
import {tap} from 'rxjs/operators';

@Injectable()
export class UtilisateurService {
  constructor(private httpClient: HttpClient,
              private router: Router) {
  }
  private static _URL = 'http://localhost:8080/';
  private static _GET_UTILISATEUR = 'getUtilisateur';
  private static _ADD_UTILISATEUR = 'addUtilisateur';
  private static _GET_UTILISATEUR_BY_ID = 'getUtilisateurById';


  getUtilisateur(): Observable<Utilisateur[]> {
    const httpHeaders = this.getHeader();
    try {
      const url = UtilisateurService._URL + UtilisateurService._GET_UTILISATEUR;
      return this.httpClient.get<Utilisateur[]>(url, {headers: httpHeaders});
    }catch (error){
      console.log('erreur dans catch : ' + error.message);
    }
    return new Observable();
  }
  getHeader(): HttpHeaders {
    const token: string = this.getToken();
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + token
    });
    return httpHeaders;
  }
  getToken(): string {
    return JSON.parse(localStorage.getItem(ConnexionService.tokenName) || '');
  }

  addUtilisateur(utilisateur: Utilisateur): Observable<any> {
    const httpHeaders = this.getHeader();
    const url = UtilisateurService._URL + UtilisateurService._ADD_UTILISATEUR;
    return this.httpClient.post<Utilisateur>(url, utilisateur, {headers: httpHeaders}).pipe(
      tap(response => {
          console.log(response);
          return response;
        },
        err => {
          console.log(err);
        })
    );
  }

  getUtilisateurById(id: number): Observable<Utilisateur> {
    const httpHeaders = this.getHeader();
    const url = UtilisateurService._URL + UtilisateurService._GET_UTILISATEUR_BY_ID + '/' + id;
    return this.httpClient.get<Utilisateur>(url, {headers: httpHeaders}).pipe(
      tap(response => {
          console.log(response);
          return response;
        },
        err => {
          console.log(err);
        })
    );
  }
}
