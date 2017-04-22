import { Component } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'register.html'
})
export class RegistrationPage {
  registerForm: FormGroup;

  constructor(public navCtrl: NavController,
              public angFire: AngularFire,
              public toastCtrl:ToastController,
              private formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(50), Validators.required, this.isEmail])],
      name: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      username: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(6), Validators.required])]
    });
  }

  isEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return {noEmail: true};
    }
  }

  cancel() {
    this.navCtrl.push(LoginPage);
  }

  register() {
    let form = this.registerForm;
    if (form.valid) {
      let user: any = {};
      user.username = form.value.username;
      user.email = form.value.email;
      user.name = form.value.name;
      user.timestamp = new Date().toISOString();
      this.angFire.database.list('/Users').push(user);
      this.navCtrl.push(LoginPage);
      let toast = this.toastCtrl.create({
        message: 'Registered successfully',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }


}
