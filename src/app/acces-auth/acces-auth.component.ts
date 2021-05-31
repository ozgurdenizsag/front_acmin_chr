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
              private utilisateurService: UtilisateurService,
              private router: Router) { }

  ngOnInit(): void {
    try {
      console.log(this.utilisateurs);
      this.getDataFromServer();
    } catch (error){
      console.error('erreur est le : ', error);
    }
  }
  // tslint:disable-next-line:typedef
  getDataFromServer(){
    this.utilisateurService.getUtilisateur().subscribe(
      data => {
        console.log(data);
        this.utilisateurs = data;
        /*
        // l'erreur est la !!
        if (this.utilisateurs.length === 0){
          console.log('vide');
          this.router.navigate(['auth']);
        }
         */
        console.log(this.utilisateurs);
      },
      // error => console.log(error)
    );
  }

}
