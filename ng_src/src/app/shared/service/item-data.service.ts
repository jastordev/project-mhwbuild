import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { Item } from '../models/item.model';
@Injectable()
export class ItemDataService {

  private _items : BehaviorSubject <Item[]>;
  private dataStore: {
    items: Item[]
  }; 

  constructor() {
    this._items = <BehaviorSubject<Item[]>>new BehaviorSubject([]);
    this.dataStore = { items: [] };    
  }

  loadAll() {
    // HTTP REQUEST HERE BUT FOR NOW SIMULATED WITH DUMMY DATA
    this.dataStore.items = this.returnDummyArray();
    this._items.next(Object.assign({}, this.dataStore).items);
  }

  getItems() : Observable <Item[]> {
    return this._items.asObservable();
  }

  getItemCount() : Observable<number> {
    return Observable.of(this.dataStore.items.length);
  }

  //
  // DUMMY DATA/TEST FUNCTIONS REMOVE WHEN DONE
  // 
  // Ahead are functions purely meant for dummydata/testing REMOVE
  returnDummyArray() : Item[] {
    let newItem  = [this.returnDummyItem(1, "Material"),
         this.returnDummyItem(2, "Consumable/Misc", "Zorah Magdaros Heat Scale"),
         this.returnDummyItem(3, "Material"),
         this.returnDummyItem(4, "Consumable/Misc")];
    return newItem;
  }

  returnDummyItem(id : number, cat : string, name? : string) : Item {
    let newItem = new Item();
    newItem.id = id;
    newItem.name = (name) ? name : "Iron Ore" + id;
    newItem.desc = "Ore that can be smelted into metal and used for many purposes";
    newItem.type = cat;
    newItem.rarity = 4;
    newItem.obtainedFrom = "Mining, Quest Rewards, Palico";
    newItem.carry = 99;
    newItem.sellPrice = 60;    
    return newItem;
  }

  testDelete(index : number){
    // HTTP SUB HERE
    this.dataStore.items.splice(index, 1);
    this._items.next(Object.assign({}, this.dataStore).items);
  }

  testAdd(){
    this.dataStore.items.unshift(this.returnDummyItem(5, "Material"));
    this._items.next(Object.assign({}, this.dataStore).items);
  }

  addItem(item : Item){
    // HTTP REQUEST HERE, IF SUCCESSFUL CONTINUE
    this.dataStore.items.unshift(item);
    this._items.next(Object.assign({}, this.dataStore).items);
  }

  updateItem(item : Item){
    //HTTP REQUEST HERE IF SUCCESSFUL CONTINUE
    let index = this.dataStore.items.findIndex(storeItem => {
      return storeItem.id == item.id;
    });
    this.dataStore.items[index] = item;
    this._items.next(Object.assign({}, this.dataStore).items);
  }

}
