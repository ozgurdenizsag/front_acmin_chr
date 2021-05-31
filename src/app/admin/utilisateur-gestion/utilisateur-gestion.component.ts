import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-utilisateur-gestion',
  templateUrl: './utilisateur-gestion.component.html',
  styleUrls: ['./utilisateur-gestion.component.scss']
})
export class UtilisateurGestionComponent implements OnInit {
  @Input() id = -1;
  @Input() login = '';
  @Input() email = '';
  @Input() roles: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
