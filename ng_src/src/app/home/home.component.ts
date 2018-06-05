import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/service/data.service';
import { ModalService } from '../shared/service/modal.service';

import { ItemDetailComponent } 
  from '../shared/components/ItemDetail/item-detail.component';

import { Observable } from 'rxjs/observable';

import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tableCounts : any;

  constructor(private data: DataService, private modal: ModalService) { }

  ngOnInit() {       
  }

  getItemCount() : Observable<number>{
    return this.data.getItemCount();
  }

  getWepCount() : Observable<number>{
    return this.data.getWepCount();
  }

  getArmCount() : Observable<number>{
    return this.data.getArmCount();
  }

  getSkillCount() : Observable<number>{
    return this.data.getSkillCount();
  }

  getBuildCount() : Observable<number>{
    return this.data.getBuildCount();
  }



  // CHANGE METHOD TO BY ID
  getItemByIndex(i : number) : Observable<Item> {   
    return this.data.getItemByIndex(i);
  }

  // TEST FUNCTION REMOVE
  testChange(){
    this.data.testItemChange(0);
  }

  testModal(){
    this.modal.init(ItemDetailComponent, {input: "This works!"}, {});
  }
}
