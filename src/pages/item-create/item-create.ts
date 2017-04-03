import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  templateUrl: 'item-create.html'
})
export class ItemCreateComponent {
  // public item: any = { 'comments': '' };
  public selectedItems: any;
  mylist: FirebaseListObservable<any>;
  public itemExists: boolean;
  newExpenseForm: FormGroup;

  constructor(public viewCtrl: ViewController,
    public angFire: AngularFire,
    private formBuilder: FormBuilder) {
    this.mylist = angFire.database.list('/MyList');
    this.mylist.subscribe(items => this.itemExists = items.length > 0);
    this.newExpenseForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      selectedItems: [],
      comments: ['']
    });
  }

  cancelCreateExpense() {
    this.viewCtrl.dismiss();
  }

  createExpense() {
    let form = this.newExpenseForm;
    if (form.valid) {
      let item: any = {};
      item.title = form.value.title;
      item.amount = form.value.amount;
      item.description = this.joinSelectedItems();
      item.comments = form.value.comments;
      this.removeSelectedItemFromMyList();
      this.viewCtrl.dismiss({ item: item });
    }
  }

  removeSelectedItemFromMyList() {
    this.mylist.subscribe((items) => {
      items.forEach((item) => {
        this.newExpenseForm.value.selectedItems.forEach((selectedItem) => {
          if (item.name === selectedItem) {
            this.mylist.remove(item);
          }
        });
      });
    });
  }

  joinSelectedItems() {
    return _.join(this.newExpenseForm.value.selectedItems, ',');
  }

}
