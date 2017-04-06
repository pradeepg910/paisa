import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MyListPage } from '../mylist/mylist';
import { HistoryPage } from '../history/history';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = MyListPage;
  tab3Root: any = HistoryPage;
  tab4Root: any = HistoryPage;
  constructor() {

  }
}
