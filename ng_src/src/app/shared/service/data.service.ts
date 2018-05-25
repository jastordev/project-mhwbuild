import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import { Item } from '../models/item.model';
import { ItemService } from './item.service';

@Injectable()
export class DataService {

  items : Observable <Item[]>;

  constructor(private itemService : ItemService) {
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

  // TEST FUNCTION
  testItemChange(i : number){
    this.itemService.testAdd();
  }
}
