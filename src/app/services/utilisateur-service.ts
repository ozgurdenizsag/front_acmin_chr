import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utilisateur} from '../model/utilisateur';
import {tap} from 'rxjs/operators';
import {VariablesService} from './variables-service';

@Injectable()
export class UtilisateurService {
  constructor(private httpClient: HttpClient) {
  }

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
      const url = VariablesService._URL + VariablesService._GET_UTILISATEUR;
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
      Authorization: VariablesService.bearer + token
    });
    return httpHeaders;
  }
  getToken(): string {
    return JSON.parse(localStorage.getItem(VariablesService.tokenName) || '');
  }

  addUtilisateur(utilisateur: Utilisateur): Observable<any> {
    const httpHeaders = this.getHeader();
    const url = VariablesService._URL + VariablesService._ADD_UTILISATEUR;
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
    const url = VariablesService._URL + VariablesService._GET_UTILISATEUR_BY_ID + '/' + id;
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
    const url = VariablesService._URL + VariablesService._DELETE_UTILISATEUR_BY_ID + '/' + userId;
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
    const login = localStorage.getItem(VariablesService.utilisateurUsername);
    const url = VariablesService._URL + VariablesService._GET_UTILISATEUR_BY_LOGIN + '/' + login;
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
    const url = VariablesService._URL + VariablesService._RECUPERER_BY_LOGIN_AND_EMAIL + '/' + login + '/' + email;
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
