import {Component} from '@angular/core';

import {NavController, ModalController, ToastController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import * as _ from 'lodash';
import {UserService} from '../user/UserService';
import {LogoutPage} from '../logout/logout';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  allItems:any = [];
  filteredItems:any = [];
  monthYearsMap:any = [];
  item:any = {};
  today:any;
  user:any;
  months: any = [];
  years: any = [];
  selectedMonth: string;
  selectedYear: string;

  constructor(public navCtrl:NavController,
              public angFire:AngularFire,
              private userService:UserService,
              private logoutService: LogoutPage) {
    this.today = new Date();
    this.user = userService.getUser();
    angFire.database.list('/Items/' + this.user.key).subscribe((_items) => {
      _items.forEach((item) => {
        this.allItems.push(item);
      });
      this.selectedMonth = this.today.getMonth();
      this.selectedYear = this.today.getFullYear();
      console.log(this.selectedYear)
      this.monthsLookup();
      this.yearsLookup();
      this.createMonthYearMap();
      this.monthYearChanged(this.selectedMonth, this.selectedYear)
    });
  }

  monthYearChanged(month, year) {
    this.filteredItems = _.filter(this.allItems, {"monthYear": month + '-' + year});
  }

  yearChanged(year) {
    this.monthYearChanged(this.selectedMonth, year);
  }

  monthChanged(month) {
    this.monthYearChanged(month, this.selectedYear);
  }

  monthsLookup() {
    this.months.push({"name": "January", "value": "0"})
    this.months.push({"name": "February", "value": "1"})
    this.months.push({"name": "March", "value": "2"})
    this.months.push({"name": "April", "value": "3"})
    this.months.push({"name": "May", "value": "4"})
    this.months.push({"name": "June", "value": "5"})
    this.months.push({"name": "July", "value": "6"})
    this.months.push({"name": "August", "value": "7"})
    this.months.push({"name": "September", "value": "8"})
    this.months.push({"name": "October", "value": "9"})
    this.months.push({"name": "November", "value": "10"})
    this.months.push({"name": "December", "value": "11"})
  }

  yearsLookup() {
    this.years.push({"name": "2017", "value": "2017"})
    this.years.push({"name": "2018", "value": "2018"});
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
    return _.sortedUniq(_.map(this.allItems, "monthYear"));
  }

  logout() {
    this.logoutService.logout();
  }

}
