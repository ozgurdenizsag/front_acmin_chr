import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../services/utilisateur-service';
import {VariablesService} from '../../services/variables-service';

@Component({
  selector: 'app-utilisateur-gestion',
  templateUrl: './utilisateur-gestion.component.html',
  styleUrls: ['./utilisateur-gestion.component.scss']
})
export class UtilisateurGestionComponent implements OnInit {
  @Input() id = -1;
  @Input() login = '';
  @Input() password = '';
  @Input() email = '';
  @Input() roles: string[] = [];
  userId = -1;
  modalTitre = 'Suppression';
  modalMessage = 'Etes-vous sûr de supprimer cet utilisateur ?';

  constructor(private router: Router,
              private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
  }

  sendDataUser(): void {
    this.utilisateurService.setIdToUpdate(this.id);
    this.router.navigate([VariablesService.UTILISATEUR_GESTION]);
  }

  deleteDataUser(): void {
    this.utilisateurService.currentId.subscribe(value => this.userId = value);
    this.utilisateurService.deleteUtilisateurById(this.userId).subscribe(
      data => {
        console.log(data);
        // window.location.reload();
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate([VariablesService.DIRECTEUR_PAGE]);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  loadIdUser(): void {
    this.utilisateurService.setIdToUpdate(this.id);
  }

  hiddenUtilisateurOptions(): boolean {
    const utilisateurUsername = localStorage.getItem(VariablesService.utilisateurUsername);
    return this.login === utilisateurUsername;
  }
}
