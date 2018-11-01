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

  constructor(private itemServ : ItemDataService, private skillServ : SkillDataService) {
    this.items = this.itemServ.getItems();
    this.skills = this.skillServ.getSkills();
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

  // Item-data service functions
  addOrUpdateItem(item : Item, iconFile? : any){   
    if(item.id) {
      this.itemServ.updateItem(item, iconFile ? iconFile : null);
    } else {
      this.itemServ.addItem(item, iconFile ? iconFile : null);
    }
  }
  deleteItems(items : Item[]){
    this.itemServ.deleteItems(items);
  }

}
