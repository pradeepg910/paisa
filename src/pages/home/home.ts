import { Component } from '@angular/core';

import { NavController, ModalController, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {ItemCreateComponent} from '../item-create/item-create';
import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any>;
  currentTotal: number;
  today: any;

  constructor(public navCtrl: NavController,
    public angFire: AngularFire,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController, ) {
    this.today = new Date();
    this.items = angFire.database.list('/Items', {
      query: {
        orderByChild: 'monthYear',
        equalTo: this.today.getMonth() + '-' + this.today.getFullYear()
      }
    });
    this.calculateMonthlyTotal();
  }

  calculateMonthlyTotal() {
    this.items.subscribe((items) => {
      let _list: Array<any> = new Array();
      items.forEach((item) => {
        _list.push(item);
      });
      this.currentTotal = _.sum(_.map(_list, 'amount'))
    });
  }

  createItem() {
    let modalPage = this.modalCtrl.create(ItemCreateComponent);
    modalPage.present();
    modalPage.onDidDismiss((obj: any) => {
      if (obj) {
        let item = obj.item;
        item.timestamp = this.today.toISOString();
        item.monthYear = this.today.getMonth() + "-" + this.today.getFullYear();
        console.log("Item: ", JSON.stringify(item));
        this.items.push({
          title: item.title,
          amount: +item.amount,
          description: item.description,
          comments: item.comments,
          timestamp: item.timestamp,
          monthYear: item.monthYear
        });
        //self.scrollToBottom();
        let toast = this.toastCtrl.create({
          message: 'Expense created',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      }
    });
  }

  delete(item) {
    this.items.remove(item.$key);
  }

}
