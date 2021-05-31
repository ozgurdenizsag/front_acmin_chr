import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../model/utilisateur';
import {ConnexionService} from '../../services/connexion-service';
import {UtilisateurService} from '../../services/utilisateur-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-gestion',
  templateUrl: './admin-gestion.component.html',
  styleUrls: ['./admin-gestion.component.scss']
})
export class AdminGestionComponent implements OnInit {

  utilisateurs: Utilisateur[] = [];

  constructor(private connexionService: ConnexionService,
              private utilisateurService: UtilisateurService,
              private router: Router) { }

  ngOnInit(): void {
      this.getDataFromServer();
  }
  getDataFromServer(): void{
    this.utilisateurService.getUtilisateur().subscribe(
      data => {
        this.utilisateurs = data;
        console.log(this.utilisateurs);
      },
      // error => console.log(error)
    );
  }

  utilisateurGestion(): void {
    this.router.navigate(['utilisateur-gestion']);
  }
}
