import {Component, OnInit} from '@angular/core';
import {ConnexionService} from '../services/connexion-service';
import {Utilisateur} from '../model/utilisateur';
import {Router} from '@angular/router';
import {UtilisateurService} from '../services/utilisateur-service';

@Component({
  selector: 'app-acces-auth',
  templateUrl: './acces-auth.component.html',
  styleUrls: ['./acces-auth.component.scss']
})
export class AccesAuthComponent implements OnInit {


  utilisateurs: Utilisateur[] = [];

  constructor(private connexionService: ConnexionService,
              private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.getDataFromServer();
  }

  getDataFromServer(): void {
    this.utilisateurService.getUtilisateur().subscribe(
      data => {
        this.utilisateurs = data;
      }
    );
  }

}
