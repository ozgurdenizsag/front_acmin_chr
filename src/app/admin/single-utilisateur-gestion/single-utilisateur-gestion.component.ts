import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilisateurService} from '../../services/utilisateur-service';
import {Router} from '@angular/router';
import {Utilisateur} from '../../model/utilisateur';
import {AdminGestionComponent} from '../admin-gestion/admin-gestion.component';

@Component({
  selector: 'app-single-utilisateur-gestion',
  templateUrl: './single-utilisateur-gestion.component.html',
  styleUrls: ['./single-utilisateur-gestion.component.scss']
})
export class SingleUtilisateurGestionComponent implements OnInit, OnDestroy {
  utilisateurForm: any;
  userId = -1;
  utilisateurToUpdate: Utilisateur = new Utilisateur(-1, '', '', '', []);

  constructor(private formBuilder: FormBuilder,
              private utilisateurService: UtilisateurService,
              private router: Router) { }

  ngOnInit(): void {
    this.utilisateurService.currentId.subscribe(value => this.userId = value);
    this.initForm();
    if (this.userId !== -1) {
      this.getUserById(this.userId);
    }
  }
  ngOnDestroy(): void {
    this.utilisateurToUpdate = new Utilisateur(-1, '', '', '', []);
  }

  initForm(): void {
    if (this.userId === -1){
      this.utilisateurForm = this.formBuilder.group({
        id: -1,
        newLogin: ['', Validators.required],
        newPassword: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        roles: this.formBuilder.array([])
      });
    }else {
      this.utilisateurForm = this.formBuilder.group({
        id: this.utilisateurToUpdate.id,
        newLogin: [this.utilisateurToUpdate.login, Validators.required],
        newPassword: [this.utilisateurToUpdate.password, Validators.required],
        email: [this.utilisateurToUpdate.email, [Validators.required, Validators.email]],
        roles: this.formBuilder.array(this.utilisateurToUpdate.roles)
      });
    }
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
        this.utilisateurService.setMessage(data[0]);
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

  getUserById(id: number): void {
    this.utilisateurService.getUtilisateurById(id).subscribe(
      response => {
        this.utilisateurToUpdate = response;
        this.initForm();
      },
      err => {
        console.log('erreur est le : ' + err);
      }
    );
  }

  onRetour(): void {
    this.router.navigate(['/directeur-page']);
  }
}
