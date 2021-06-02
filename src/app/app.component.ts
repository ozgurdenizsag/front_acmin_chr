import {Component, OnInit} from '@angular/core';
import {ConnexionService} from './services/connexion-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'worldline-admin';
  username = '';
  constructor(private connexionService: ConnexionService) {
  }
  isUserAuthenticated(): boolean{
    return this.connexionService.isAuthenticated();
  }

  loadUsername(): void{
    this.username = localStorage.getItem('utilisateur_username') || '';
  }

  ngOnInit(): void {
    this.loadUsername();
  }

  seDeconnecter(): void {
    this.connexionService.deconnection();
  }
}
