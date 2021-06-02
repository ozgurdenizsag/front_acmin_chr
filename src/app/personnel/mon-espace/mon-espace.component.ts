import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from '../../services/utilisateur-service';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Utilisateur} from '../../model/utilisateur';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mon-espace',
  templateUrl: './mon-espace.component.html',
  styleUrls: ['./mon-espace.component.scss']
})
export class MonEspaceComponent implements OnInit {
  utilisateurForm: any;
  utilisateur: Utilisateur = new Utilisateur(-1, '', '', '', []);
  message = '';

  constructor(private formBuilder: FormBuilder,
              private utilisateurService: UtilisateurService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.loadPersonnalData();
  }
  loadPersonnalData(): void {
    this.utilisateurService.getDonneesUtilisateur().subscribe(
      data => {
        this.utilisateur = data;
        this.initForm();
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmitForm(): void {
    const formValue = this.utilisateurForm.value;
    const newUtilisateur = new Utilisateur(
      formValue.id,
      formValue.newLogin,
      formValue.newPassword,
      formValue.email,
      formValue.roles ? formValue.roles : []
    );
    this.ajouterUtilisateur(newUtilisateur);
  }

  ajouterUtilisateur(newUtilisateur: Utilisateur): void{
    this.utilisateurService.addUtilisateur(newUtilisateur).subscribe(
      data => {
        this.message = data[0];
      },
      error => console.log(error)
    );
  }

  initForm(): void {
    this.utilisateurForm = this.formBuilder.group({
      id: this.utilisateur.id,
      newLogin: [this.utilisateur.login, Validators.required],
      newPassword: [this.utilisateur.password, Validators.required],
      email: [this.utilisateur.email, [Validators.required, Validators.email]],
      roles: this.formBuilder.array(this.utilisateur.roles)
    });
  }

  getRoles(): FormArray{
    return this.utilisateurForm.get('roles') as FormArray;
  }
}
