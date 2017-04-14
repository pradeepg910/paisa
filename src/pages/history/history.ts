import {Component} from '@angular/core';

import {NavController, ModalController, ToastController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import * as _ from 'lodash';
import {UserService} from '../user/UserService';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  items:any = [];
  filteredItems:any = [];
  monthYearsMap:any = [];
  item:any = {};
  today:any;
  user:any;

  constructor(public navCtrl:NavController,
              public angFire:AngularFire,
              private userService:UserService) {
    this.today = new Date();
    this.user = userService.getUser();
    angFire.database.list('/Items/' + this.user.key).subscribe((_items) => {
      _items.forEach((item) => {
        if (!_.isEqual(item.monthYear, this.today.getMonth() + '-' + this.today.getFullYear())) {
          this.items.push(item);
        }
      });
      this.createMonthYearMap();
    });
  }

  monthYearChanged(selectedMY) {
    this.filteredItems = _.filter(this.items, {"monthYear": selectedMY});
  }

  createMonthYearMap() {
    let monthYearsValues = this.uniqueMonthYears();
    _.forEach(monthYearsValues, value => {
      console.log('debugggg', value);
      let monthYearArray = _.split(value, '-', 2);
      let date = new Date();
      date.setMonth(monthYearArray[0]);
      date.setFullYear(monthYearArray[1]);
      this.monthYearsMap.push({"date": date, "value": value});
    });
  }

  uniqueMonthYears() {
    return _.sortedUniq(_.map(this.items, "monthYear"));
  }

}
