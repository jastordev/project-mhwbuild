import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import { Item } from '../models/item.model';
import { ItemDataService } from './item-data.service';

@Injectable()
export class DataService {

  items : Observable <Item[]>;
  serverCount : Observable <number>; // REMOVE

  constructor(private itemService : ItemDataService) {
    this.items = this.itemService.getItems();
    this.serverCount = this.itemService.getTestCount(); // REMOVE
  }

  // Count methods, modify as tables become available
  getItemCount(){
    return this.itemService.getItemCount();
  }

  getWepCount() : Observable<number>{
    return Observable.of(99);
  }

  getArmCount() : Observable<number>{
    return Observable.of(99);
  }

  getSkillCount() : Observable<number>{
    return Observable.of(99);
  }

  getBuildCount() : Observable<number>{
    return Observable.of(99);
  }

  // TEST REMOVE
  getTestCount() : Observable<number> {
    return this.serverCount;
  }
  // TEST REMOVE
  testReq() {
    this.itemService.testReq();
  }

  // Item-data service functions
  addOrUpdateItem(item : Item){   
    if(item.id) {
      this.itemService.updateItem(item);
    } else {
      this.itemService.addItem(item);
    }
  }

  deleteItems(items : Item[]){
    this.itemService.deleteItems(items);
  }

  testError(){
    this.itemService.testHttpError();
  }

  // getItemByIndex(i : number) : Observable<Item> {   
  //   let placeItem : Observable<Item>;
    
  //   this.items.take(1).subscribe( data => {        
  //     placeItem =  Observable.of(data[i]);
  //     return placeItem;
  //   }); 

  //   return placeItem; 
  // }

}
