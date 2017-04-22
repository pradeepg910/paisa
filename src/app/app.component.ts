import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {Storage} from '@ionic/storage';
import {UserService} from '../pages/user/UserService';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage:any;

  constructor(platform:Platform, statusBar:StatusBar,
              splashScreen:SplashScreen,
              public storage:Storage,
              private userService:UserService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.storage.get('user').then((user) => {
        if (user) {
          userService.setUser(user);
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      });
    });
  }


}
