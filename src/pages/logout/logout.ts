import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {Storage} from '@ionic/storage';
import {UserService} from '../user/UserService';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-logout',
  template: ''
})
export class LogoutPage {

  constructor(private navCtrl: NavController,
              public angFire:AngularFire,
              public storage:Storage,
              private userService:UserService) {
    storage.set('user', null);
    userService.setUser(null);
    this.navCtrl.push(LoginPage);
  }

}
