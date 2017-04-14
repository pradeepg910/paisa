export class UserService {

  user: any;

  constructor() {
  }

  setUser(user) {
    console.log(user);
    this.user = user;
  }

  getUser() {
    console.log(this.user);
    return this.user;
  }
}
