import {Injectable} from '@angular/core';

@Injectable()
export class VariablesService {
  constructor() {}

  // Authorization item
  static bearer = 'Bearer ';

  // localStorage elements
  static tokenName = 'worldline_token';
  static utilisateurUsername = 'utilisateur_username';

  // Components names to navigate
  static DEFAULT_PAGE = '';
  static ACCUEIL = 'accueil';
  static AUTH = 'auth';
  static RECUPERATION_IDENTIFIANT = 'recuperation-identifiants';
  static DIRECTEUR_PAGE = 'directeur-page';
  static UTILISATEUR_GESTION = 'utilisateur-gestion';
  static MON_ESPACE = 'mon-espace';
  static ROLE_GESTION = 'role-gestion';
  static FORBIDDEN_PAGE = 'forbidden-page';
  static NOT_FOUND = 'not-found';
  static RONDOM_URL = '**';

  // basic back-end port
  static _URL = 'http://localhost:8080/';

  // URLs
  static _GET_UTILISATEUR = 'getUtilisateur';
  static _ADD_UTILISATEUR = 'addUtilisateur';
  static _GET_UTILISATEUR_BY_ID = 'getUtilisateurById';
  static _GET_UTILISATEUR_BY_LOGIN = 'getUtilisateurByLogin';
  static _DELETE_UTILISATEUR_BY_ID = 'deleteUtilisateurById';
  static _RECUPERER_BY_LOGIN_AND_EMAIL = 'recupererByLoginAndEmail';
  static _AUTHENTICATE = 'authenticate';

}
