import { Component } from '@angular/core';

import { NavController, ModalController, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { RegistrationPage } from '../register/register';
import * as _ from 'lodash';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
              public angFire: AngularFire,
              private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required])]
    });
  }

  login(){

    this.angFire.database.list('/Users', {
      query: {
        orderByChild: 'username',
        equalTo: this.loginForm.value.username
      }
    }).subscribe((users) => {
      console.log(users);
      let user = _.head(users);
      if(user) {
        this.navCtrl.push(TabsPage);
      }
    });
  }

  register() {
    this.navCtrl.push(RegistrationPage);
  }

}
