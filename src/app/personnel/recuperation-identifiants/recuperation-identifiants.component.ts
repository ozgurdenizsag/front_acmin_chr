import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ConnexionService} from '../../services/connexion-service';
import {UtilisateurService} from '../../services/utilisateur-service';

@Component({
  selector: 'app-recuperation-identifiants',
  templateUrl: './recuperation-identifiants.component.html',
  styleUrls: ['./recuperation-identifiants.component.scss']
})
export class RecuperationIdentifiantsComponent implements OnInit {
  message = '';
  authStatus = false;

  constructor(private connexionService: ConnexionService,
              private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.authStatus = this.connexionService.isAuthenticated();
    if (this.authStatus){
      this.connexionService.redirectTo(this.connexionService.getAccueil());
    }
  }

  onRecuperationIdentifiants(form: NgForm): void {
    const login = form.value.username;
    const email = form.value.email;
    this.utilisateurService.recupererIdentifiants(login, email).subscribe(
      data => {
        this.message = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}
