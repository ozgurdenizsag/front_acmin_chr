import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilisateurService} from '../../services/utilisateur-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Utilisateur} from '../../model/utilisateur';

@Component({
  selector: 'app-single-utilisateur-gestion',
  templateUrl: './single-utilisateur-gestion.component.html',
  styleUrls: ['./single-utilisateur-gestion.component.scss']
})
export class SingleUtilisateurGestionComponent implements OnInit {
  utilisateurForm: any;

  constructor(private formBuilder: FormBuilder,
              private utilisateurService: UtilisateurService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.utilisateurForm = this.formBuilder.group({
      id: -1,
      newLogin: ['', Validators.required],
      newPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: this.formBuilder.array([])
    });
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
        console.log(data);
        this.router.navigate(['/directeur-page']);
      },
      // error => console.log(error)
    );
  }

  getRoles(): FormArray{
    return this.utilisateurForm.get('roles') as FormArray;
  }

  onAddRole(): void{
    const newRolesControl = this.formBuilder.control('', Validators.required);
    this.getRoles().push(newRolesControl);
  }

  onDeleteRole(index: number): void {
    this.getRoles().removeAt(index);
  }
}
