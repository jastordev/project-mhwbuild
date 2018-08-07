import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import { Item } from '../models/item.model';
import { Skill } from '../models/skill.model';

import { ItemDataService } from './data/item-data.service';
import { SkillDataService } from './data/skill-data.service';



@Injectable()
export class DataService {

  items : Observable <Item[]>;
  skills : Observable <Skill[]>;
  serverCount : Observable <number>; // REMOVE

  constructor(private itemServ : ItemDataService, private skillServ : SkillDataService) {
    this.items = this.itemServ.getItems();
    this.skills = this.skillServ.getSkills();
    this.serverCount = this.itemServ.getTestCount(); // REMOVE
  }

  // Count methods, modify as tables become available
  getItemCount(){
    return this.itemServ.getItemCount();
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
    this.itemServ.testReq();
  }

  // Item-data service functions
  addOrUpdateItem(item : Item, iconFile? : any){   
    if(item.id) {
      this.itemServ.updateItem(item);
    } else {
      this.itemServ.addItem(item, iconFile ? iconFile : null);
    }
  }

  deleteItems(items : Item[]){
    this.itemServ.deleteItems(items);
  }

  testError(){
    this.itemServ.testHttpError();
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
