import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Role} from '../../model/role';

@Component({
  selector: 'app-role-gestion',
  templateUrl: './role-gestion.component.html',
  styleUrls: ['./role-gestion.component.scss']
})
export class RoleGestionComponent implements OnInit {
  roleAddedMessage = '';
  roleForm: any;
  roles: Role[] = [];

  constructor() { }

  ngOnInit(): void {
    const role = new Role(1, 'TESTINGROLES');
    this.roles.push(role);
    this.roles.push(role);
    this.roles.push(role);
  }

  onAddRole(form: NgForm): void{
    const libelle = form.value.roleName;
    console.log(libelle);
  }
}


