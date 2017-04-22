import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MyListPage } from '../mylist/mylist';
import { HistoryPage } from '../history/history';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = MyListPage;
  tab3Root: any = HistoryPage;
  constructor() {

  }
}
