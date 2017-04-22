import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MyListPage } from '../pages/mylist/mylist';
import { TabsPage } from '../pages/tabs/tabs';
import {HistoryPage} from '../pages/history/history'
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import {ItemCreateComponent} from '../pages/item-create/item-create';
import {RegistrationPage} from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {UserService} from '../pages/user/UserService';

import {AngularFireModule} from 'angularfire2';
import { Ng2CompleterModule } from "ng2-completer";
import { IonicStorageModule } from '@ionic/storage';

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
    TabsPage,
    MyListPage,
    HistoryPage,
    LoginPage,
    ItemCreateComponent,
    RegistrationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, { tabsPlacement: 'bottom' }),
    AngularFireModule.initializeApp(config),
    Ng2CompleterModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MyListPage,
    HistoryPage,
    LoginPage,
    ItemCreateComponent,
    RegistrationPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    LogoutPage,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
