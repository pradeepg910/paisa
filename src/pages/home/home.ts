import { Component } from '@angular/core';

import { NavController, ModalController, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {ItemCreateComponent} from '../item-create/item-create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,
    public angFire: AngularFire,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController, ) {
    this.items = angFire.database.list('/Items');
  }

  createItem() {
    let modalPage = this.modalCtrl.create(ItemCreateComponent);
    console.log('222');
    modalPage.onDidDismiss((obj: any) => {
      let item = obj.item;
      if (item) {
        console.log("Item: ", JSON.stringify(item));
        this.items.push({ title: item.title, amount: item.amount, description: item.description });
        //self.scrollToBottom();
        let toast = this.toastCtrl.create({
          message: 'Expense created',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    });

    modalPage.present();

  }

}
