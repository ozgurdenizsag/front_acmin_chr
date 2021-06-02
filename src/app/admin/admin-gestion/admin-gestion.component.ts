import {Component, OnDestroy, OnInit} from '@angular/core';
import {Utilisateur} from '../../model/utilisateur';
import {ConnexionService} from '../../services/connexion-service';
import {UtilisateurService} from '../../services/utilisateur-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-gestion',
  templateUrl: './admin-gestion.component.html',
  styleUrls: ['./admin-gestion.component.scss']
})
export class AdminGestionComponent implements OnInit, OnDestroy {

  utilisateurs: Utilisateur[] = [];
  message = '';

  constructor(private connexionService: ConnexionService,
              private utilisateurService: UtilisateurService,
              private router: Router) { }

  ngOnInit(): void {
      this.getDataFromServer();
      this.utilisateurService.currentMessage.subscribe(value => this.message = value);
  }
  getDataFromServer(): void{
    this.utilisateurService.getUtilisateur().subscribe(
      data => {
        this.utilisateurs = data;
      },
      // error => console.log(error)
    );
  }

  utilisateurGestion(): void {
    this.utilisateurService.setIdToUpdate(-1);
    this.router.navigate(['utilisateur-gestion']);
  }

  ngOnDestroy(): void {
    this.utilisateurService.setMessage('');
  }

}
