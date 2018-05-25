import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';
import { DataService } from '../shared/service/data.service';

import { Observable } from 'rxjs/observable';

import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tableCounts : any;

  constructor(private home: HomeService, private data: DataService) { }

  ngOnInit() {
    this.getOverview();    
  }

  getOverview(){
    this.home.getOverview().subscribe(tblCounts => {
      this.tableCounts = tblCounts;
    });
  }

  // CHANGE METHOD TO BY ID
  getItemByIndex(i : number) : Observable<Item> {   
    return this.data.getItemByIndex(i);
  }

  // TEST FUNCTION REMOVE
  testChange(){
    this.data.testItemChange(0);
  }
}
