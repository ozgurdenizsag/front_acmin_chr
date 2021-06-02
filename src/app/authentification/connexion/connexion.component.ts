import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../model/user';
import {HttpClient} from '@angular/common/http';
import {ConnexionService} from '../../services/connexion-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  authStatus = false;
  credentialsError = true;
  public user: User = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient,
              private connexionService: ConnexionService) {
  }

  ngOnInit(): void {
    this.authStatus = this.connexionService.isAuthenticated();
    if (this.authStatus){
      this.connexionService.redirectTo(this.connexionService.getAccueil());
    }
  }

  // tslint:disable-next-line:typedef
  onLogIn(form: NgForm){
    const login = form.value.username;
    const password = form.value.password;
    this.user.username = login;
    this.user.password = password;
    this.connexionService.doConnexion(this.user).subscribe(
      response => {
        console.log(response[0].length);
        if (response[0].length === 0){
          this.credentialsError = false;
        } else {
          this.credentialsError = true;
          this.connexionService.redirectTo(this.connexionService.getAccueil());
          // console.log(this.connexionService.getItemFromLocalStorage(this.connexionService.getUtilisateurUsername()));
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onCredentialsErrorClicked(): void {
    this.credentialsError = true;
  }
}
