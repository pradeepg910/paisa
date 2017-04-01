import { Component } from '@angular/core';

import { NavController, ModalController, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import * as _ from 'lodash';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  items: any = [];
  filteredItems: any = [];
  monthYearsMap: any = [];
  item: any = {};
  today: any;

  constructor(public navCtrl: NavController,
    public angFire: AngularFire,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController, ) {
    this.today = new Date();
    angFire.database.list('/Items').subscribe((_items) => {
      this.items = new Array();
      _items.forEach((item) => {
        if (!_.isEqual(item.monthYear, this.today.getMonth() + '-' + this.today.getFullYear())) {
          this.items.push(item);
        }
      });
      this.createMonthYearMap();
    });
  }

  monthYearChanged(selectedMY) {
    console.log(selectedMY);
    this.filteredItems = _.filter(this.items, { "monthYear": selectedMY });
  }

  createMonthYearMap() {
    let monthYearsValues = this.uniqueMonthYears();
    for (var i = 0, len = monthYearsValues.length; i < len; i++) {
      let value = monthYearsValues[i];
      let monthYearArray = _.split(value, '-', 2);
      let date = new Date();
      date.setMonth(monthYearArray[0]);
      date.setFullYear(monthYearArray[1]);
      this.monthYearsMap.push({ "date": date, "value": value });
    }
  }

  uniqueMonthYears() {
    return _.sortedUniq(_.map(this.items, "monthYear"));
  }

}
