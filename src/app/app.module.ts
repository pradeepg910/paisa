import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ItemCreateComponent} from '../pages/item-create/item-create';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AngularFireModule} from 'angularfire2';

export const config = {
  apiKey: "AIzaSyCTDcKz5CgF29cxUkeyPrb9I-cxMiyOYVY",
  authDomain: "paisa-b1840.firebaseapp.com",
  databaseURL: "https://paisa-b1840.firebaseio.com",
  storageBucket: "paisa-b1840.appspot.com",
  messagingSenderId: "350503381962"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemCreateComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemCreateComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
