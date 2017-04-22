import {Component} from '@angular/core';

import {NavController, App} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {Storage} from '@ionic/storage';
import {UserService} from '../user/UserService';
import {LoginPage } from '../login/login';
@Component({
  selector: 'page-logout',
  template: ''
})
export class LogoutPage {

  constructor(private navCtrl: NavController,
              public angFire:AngularFire,
              public storage:Storage,
              private userService:UserService,
              public app: App) {
    storage.set('user', null);
    userService.setUser(null);
    console.log(this.app);
    this.app.getRootNav().setRoot(LoginPage);
  }

}
