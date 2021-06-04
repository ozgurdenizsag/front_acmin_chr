import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ConnexionService} from './connexion-service';
import {VariablesService} from './variables-service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private connexionService: ConnexionService,
              private router: Router) {
  }
  canActivate(): boolean {
    if (!this.connexionService.isAuthenticated()) {
      this.router.navigate([VariablesService.AUTH]);
      return false;
    }
    return true;
  }
}
