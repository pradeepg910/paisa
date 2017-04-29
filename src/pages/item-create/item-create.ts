import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import {UserService} from '../user/UserService';

@Component({
  templateUrl: 'item-create.html'
})
export class ItemCreateComponent {
  public selectedItems: any;
  public mylist: FirebaseListObservable<any>;
  public categories: FirebaseListObservable<any>;
  public itemExists: boolean;
  newExpenseForm: FormGroup;

  constructor(public viewCtrl: ViewController,
              public angFire: AngularFire,
              private formBuilder: FormBuilder,
              private userService:UserService) {
    this.mylist = angFire.database.list('/MyList/'+userService.getUser().key);
    this.mylist.subscribe(items => this.itemExists = items.length > 0);
    this.categories = angFire.database.list('/Categories');
    this.newExpenseForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      selectedItems: [],
      category: [],
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
      item.category = form.value.category;
      this.removeSelectedItemFromMyList();
      this.viewCtrl.dismiss({ item: item });
    }
  }

  removeSelectedItemFromMyList() {
    this.mylist.subscribe((items) => {
      items.forEach((item) => {
        if (_.includes(this.newExpenseForm.value.selectedItems, item.name)) {
          this.mylist.remove(item);
        }
      });
    });
  }

  joinSelectedItems() {
    return _.join(this.newExpenseForm.value.selectedItems, ',');
  }

}
