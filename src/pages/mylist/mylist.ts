import { Component } from '@angular/core';

import { NavController, ModalController, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'page-mylist',
  templateUrl: 'mylist.html'
})
export class MyListPage {

  items: FirebaseListObservable<any>;
  currentTotal: number;
  item: any = {};

  constructor(public navCtrl: NavController,
    public angFire: AngularFire,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController, ) {
    this.items = angFire.database.list('/MyList');
  }

  createItem() {
    this.items.push({
      name: this.item.name,
      store: "",
      timestamp: new Date().toISOString()
    });
    this.item = {};
    let toast = this.toastCtrl.create({
      message: 'Item created',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  delete(item) {
    this.items.remove(item.$key);
  }

}
