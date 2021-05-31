import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {ConnexionService} from '../services/connexion-service';
import {Router} from '@angular/router';

@Injectable()
export class MyErrorHandler implements  ErrorHandler {
  constructor(private connexionService: ConnexionService,
              private router: Router, private ngZone: NgZone) { }
  handleError(error: Error): void {
    console.log(error.message);
    this.ngZone.run(() => {
      this.router.navigate(['/forbidden-page']);
    });
  }
}
