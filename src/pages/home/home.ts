import {Component} from '@angular/core';

import {ModalController, ToastController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {ItemCreateComponent} from '../item-create/item-create';
import * as _ from 'lodash';

import {UserService} from '../user/UserService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  items:FirebaseListObservable<any>;
  currentTotal:number;
  today:any;
  lastMonthTotal:any;
  greetMsg:string;
  user:any;

  constructor(public angFire:AngularFire,
              public modalCtrl:ModalController,
              public toastCtrl:ToastController,
              private userService:UserService) {

    this.today = new Date();
    this.user = userService.getUser();
    this.items = angFire.database.list('/Items/' + this.user.key, {
      query: {
        orderByChild: 'monthYear',
        equalTo: this.today.getMonth() + '-' + this.today.getFullYear()
      }
    });
    this.calculateMonthlyTotal();
    this.calculateLastMonthTotal();
    this.greetMsg = this.greetMessage();

  }

  calculateMonthlyTotal() {
    this.items.subscribe((items) => {
      let _list:Array<any> = new Array();
      items.forEach((item) => {
        _list.push(item);
      });
      this.currentTotal = _.sum(_.map(_list, 'amount'));
    });
  }

  calculateLastMonthTotal() {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    this.angFire.database.list('/Items', {
      query: {
        orderByChild: 'monthYear',
        equalTo: date.getMonth() + '-' + date.getFullYear()
      }
    }).subscribe((items) => {
      let _list:Array<any> = new Array();
      items.forEach((item) => {
        _list.push(item);
      });
      this.lastMonthTotal = _.sum(_.map(_list, 'amount'));
    });
    ;
  }

  createItem() {
    let modalPage = this.modalCtrl.create(ItemCreateComponent);
    modalPage.present();
    modalPage.onDidDismiss((obj:any) => {
      if (obj) {
        let item = obj.item;
        item.timestamp = this.today.toISOString();
        item.monthYear = this.today.getMonth() + "-" + this.today.getFullYear();
        this.items.push({
          title: item.title,
          amount: +item.amount,
          description: this.getDescriptionConditionally(item),
          descShort: _.truncate(item.description, {'length': 15}),
          timestamp: item.timestamp,
          monthYear: item.monthYear
        });
        //self.scrollToBottom();
        let toast = this.toastCtrl.create({
          message: 'Expense created',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    });
  }

  getDescriptionConditionally(item) {
    if (_.isEmpty(item.description)) {
      return item.comments;
    }
    return item.description;
  }

  delete(item) {
    this.items.remove(item.$key);
  }

  greetMessage() {
    let hours = new Date().getHours();
    let greet;
    if (hours < 12)
      greet = 'Good Morning';
    else if (hours >= 12 && hours <= 17)
      greet = 'Good Afternoon';
    else if (hours >= 17 && hours <= 24)
      greet = 'Good Evening';
    return greet;
  }

}
