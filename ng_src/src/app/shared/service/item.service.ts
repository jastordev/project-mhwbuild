import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Item } from '../models/item.model';

@Injectable()
export class ItemService {

  private _items : BehaviorSubject <Item[]>;  

  constructor() {
    this._items = <BehaviorSubject<Item[]>>new BehaviorSubject([]);    
  }

  loadAll() {
    // HTTP REQUEST HERE BUT FOR NOW SIMULATED WITH DUMMY DATA
    this._items.next(Object.assign({}, this.returnDummyArray()));
  }

  getItems() : Observable <Item[]> {
    return this._items.asObservable();
  }

  // Ahead are functions purely meant for dummydata/testing
  returnDummyArray() : Item[] {
    let newItem : Item[] = [this.returnDummyItem(1), this.returnDummyItem(2), this.returnDummyItem(3)];
    return newItem;
  }

  returnDummyItem(id : number) : Item {
    let newItem = new Item();
    newItem.id = id;
    newItem.name = "Iron Ore" + id;
    newItem.desc = "Ore that can be smelted into metall and used for many purposes" + id;
    newItem.type = "Material";
    newItem.rarity = 4;
    newItem.obtainedFrom = "Places";
    newItem.carry = 99;
    newItem.sellPrice = 60;    
    return newItem;
  }

}
