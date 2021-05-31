export class Utilisateur {

  constructor(public id: number,
              public login: string,
              public password: string,
              public email: string,
              public roles: string[],
              ) {}
}
