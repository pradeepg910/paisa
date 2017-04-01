import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    public toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.toast(this.greetMessage());
  }

  toast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  greetMessage() {
    let hours = new Date().getHours();
    let greet;
    if (hours < 12)
      greet = 'Good Morning..';
    else if (hours >= 12 && hours <= 17)
      greet = 'Good Afternoon..';
    else if (hours >= 17 && hours <= 24)
      greet = 'Good Evening..';
    return greet;
  }
}
