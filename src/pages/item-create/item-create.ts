import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'item-create.html'
})
export class ItemCreateComponent {
  public item: any = {};

  constructor(public viewCtrl: ViewController) {
  }

  cancelCreateExpense() {
    this.viewCtrl.dismiss();
  }

  createExpense() {
    this.viewCtrl.dismiss({ item: this.item });
  }

}
