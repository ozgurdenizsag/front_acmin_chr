import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../model/user';
import {HttpClient} from '@angular/common/http';
import {ConnexionService} from '../../services/connexion-service';
import {VariablesService} from '../../services/variables-service';

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
      this.connexionService.redirectTo(VariablesService.ACCUEIL);
    }
  }

  onLogIn(form: NgForm): void{
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
          this.connexionService.redirectTo(VariablesService.ACCUEIL);
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
