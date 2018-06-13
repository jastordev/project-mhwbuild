import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import { Item } from '../models/item.model';
import { ItemDataService } from './item-data.service';

@Injectable()
export class DataService {

  items : Observable <Item[]>;

  constructor(private itemService : ItemDataService) {
    this.itemService.loadAll();
    this.items = this.itemService.getItems();    
  }

  getItemByIndex(i : number) : Observable<Item> {   
    let placeItem : Observable<Item>;
    
    this.items.take(1).subscribe( data => {        
      placeItem =  Observable.of(data[i]);
      return placeItem;
    }); 

    return placeItem; 
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

  itemAddOrUpdate(item : Item){   
    if(item.id) {
      this.itemService.updateItem(item);
    } else {
      this.itemService.addItem(item);
    }
  }

  // TEST REMOVE
  // TEST FUNCTION
  testItemChange(i : number){
    this.itemService.testDelete(0);
  }
}
