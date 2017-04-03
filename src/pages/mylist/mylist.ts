import { Component } from '@angular/core';

import { NavController, ModalController, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'page-mylist',
  templateUrl: 'mylist.html'
})
export class MyListPage {

  items: FirebaseListObservable<any>;
  currentTotal: number;
  myListForm: FormGroup;

  constructor(public navCtrl: NavController,
    public angFire: AngularFire,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder) {
    this.items = angFire.database.list('/MyList');
    this.myListForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])]
    });
  }

  createItem() {
    let form = this.myListForm;
    if (form.valid) {
      this.pushItem(form);
      this.showToast();
    }
  }

  pushItem(form) {
    this.items.push({
      name: form.value.name,
      store: "",
      timestamp: new Date().toISOString()
    });
    form.reset();
  }

  delete(item) {
    this.items.remove(item.$key);
  }

  showToast() {
    let toast = this.toastCtrl.create({
      message: 'Item created',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
