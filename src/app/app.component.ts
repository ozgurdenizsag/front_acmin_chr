import {Component, OnInit} from '@angular/core';
import {ConnexionService} from './services/connexion-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'worldline-admin';
  constructor(private connexionService: ConnexionService) {
  }
  isUserAuthenticated(): boolean{
    return this.connexionService.isAuthenticated();
  }

  ngOnInit(): void {
    // const userKeyRegExp = /^[A-Z]\-[0-9]{2}\-[0-9]{2}[A-Z]?$/;
    // console.log(userKeyRegExp.test('A-01-13A'));

    // const exp = /^[A-Z]+?$/;
    const exp = /^[A-Z]{4,}?$/;
    console.log(exp.test('ADMIN'));
    console.log(exp.test('MANAGER'));
    console.log(exp.test('*'));
    console.log(exp.test(''));
    console.log(exp.test('ADMIN '));
    console.log(exp.test('ADM'));
  }
}
