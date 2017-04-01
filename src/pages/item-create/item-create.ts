import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  templateUrl: 'item-create.html'
})
export class ItemCreateComponent {
  public item: any = {};
  public selectedItems: any;
  mylist: FirebaseListObservable<any>;

  constructor(public viewCtrl: ViewController,
    public angFire: AngularFire, ) {
    this.mylist = angFire.database.list('/MyList');
  }

  cancelCreateExpense() {
    this.viewCtrl.dismiss();
  }

  createExpense() {
    this.item.description = this.selectedItems.join(', ');
    console.log(this.selectedItems);
    this.viewCtrl.dismiss({ item: this.item });
  }

  copyFromCart() {
    console.log("===>>");
  }
}
