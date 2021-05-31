import { Component, OnInit } from '@angular/core';
import {ConnexionService} from '../../services/connexion-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-deconnection',
  templateUrl: './deconnection.component.html',
  styleUrls: ['./deconnection.component.scss']
})
export class DeconnectionComponent implements OnInit {

  constructor(private connexionService: ConnexionService) { }

  ngOnInit(): void {
  }

  onDecoYes(): void{
    this.connexionService.deconnection();
  }

  onDecoNo(): void {
    this.connexionService.redirectTo(this.connexionService.getAccueil());
  }
}
