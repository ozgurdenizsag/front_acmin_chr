import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-role-liste',
  templateUrl: './role-liste.component.html',
  styleUrls: ['./role-liste.component.scss']
})
export class RoleListeComponent implements OnInit {
  @Input() id = -1;
  @Input() libelle = '';
  roleForm: any;
  modalTitre = 'Suppression';
  modalMessage = 'Etes vous sûr de vouloir supprimer ce rôle ? Les utilisateurs qui ont déjà ce rôle continueront à l\'utiliser.';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.roleForm = this.formBuilder.group({
      id: this.id,
      roleName: [this.libelle, Validators.required]
    });
  }

  loadIdRole(): void {

  }

  modifierRoleLibelle(): void {

  }

  deleteRole(): void {

  }
}
