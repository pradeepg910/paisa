import {Component} from '@angular/core';

import {App} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserService} from '../user/UserService';
import {LoginPage } from '../login/login';
@Component({
  selector: 'page-logout',
  template: ''
})
export class LogoutPage {

  constructor(public storage:Storage,
              private userService:UserService,
              private app: App) {
  }

  logout() {
    this.storage.set('user', null);
    this.userService.setUser(null);
    this.app.getRootNav().setRoot(LoginPage);
  }
}
