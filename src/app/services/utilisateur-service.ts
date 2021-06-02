import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utilisateur} from '../model/utilisateur';
import {ConnexionService} from './connexion-service';
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
  private static _GET_UTILISATEUR_BY_LOGIN = 'getUtilisateurByLogin';
  private static _DELETE_UTILISATEUR_BY_ID = 'deleteUtilisateurById';
  private static _RECUPERER_BY_LOGIN_AND_EMAIL = 'recupererByLoginAndEmail';

  private idSource = new BehaviorSubject<number>(-1);
  currentId = this.idSource.asObservable();

  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  setIdToUpdate(id: number): void {
    this.idSource.next(id);
  }
  setMessage(message: string): void {
    this.messageSource.next(message);
  }


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
          return response;
        },
        err => {
          console.log(err);
        })
    );
  }

  deleteUtilisateurById(userId: number): Observable<any> {
    const httpHeaders = this.getHeader();
    const url = UtilisateurService._URL + UtilisateurService._DELETE_UTILISATEUR_BY_ID + '/' + userId;
    return this.httpClient.delete(url, {headers: httpHeaders}).pipe(
      tap(response => {
          return response;
        },
        err => {
          console.log(err);
        })
    );
  }

  getDonneesUtilisateur(): Observable<Utilisateur>{
    const httpHeaders = this.getHeader();
    const url = UtilisateurService._URL + UtilisateurService._GET_UTILISATEUR_BY_LOGIN + '/' + localStorage.getItem('utilisateur_username');
    return this.httpClient.get<Utilisateur>(url, {headers: httpHeaders}).pipe(
      tap(response => {
          return response;
        },
        err => {
          console.log(err);
        })
    );
  }

  recupererIdentifiants(login: string, email: string): Observable<any> {
    console.log('on est la');
    const url = UtilisateurService._URL + UtilisateurService._RECUPERER_BY_LOGIN_AND_EMAIL + '/' + login + '/' + email;
    return this.httpClient.get(url).pipe(
      tap(response => {
          return response;
        },
        err => {
          console.log(err);
        })
    );
  }
}
