import { Component } from '@angular/core';

import { NavController} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { RegistrationPage } from '../register/register';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';
import {UserService} from '../user/UserService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  errorMsg: string;

  constructor(public navCtrl: NavController,
    public angFire: AngularFire,
    private formBuilder: FormBuilder,
    public storage: Storage,
    private userService: UserService) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required])]
    });
  }

  login() {
    this.errorMsg = null;
    this.angFire.database.list('/Users', {
      query: {
        orderByChild: 'username',
        equalTo: this.loginForm.value.username
      }
    }).subscribe((users) => {
      let user = _.head(users);
      if (!_.isNil(user)) {
        let userObj = _.clone(user);
        userObj.key = user.$key;
        this.storage.set('user', userObj);
        this.userService.setUser(userObj);
        this.navCtrl.push(TabsPage);
      } else {
        this.errorMsg = 'Username does not match our records.';
      }
    });
  }

  register() {
    this.navCtrl.push(RegistrationPage);
  }

}
