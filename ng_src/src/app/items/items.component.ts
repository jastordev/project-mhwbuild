import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { Item } from '../shared/models/item.model';

import { DataService } from '../shared/service/data.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items : Item[];
  categories : string[];

  constructor(private data : DataService) { }

  ngOnInit() {
    this.categories = ["Materials", "Ammo/Coatings", "Consumables and Misc", 
       "Decorations", "Specialized Tools"];

    this.data.items.subscribe( data => {
      this.items = data;
    });
  }

  itemsPerCategory(category : string) : Item[] {
    
    let tempList : Item[];

    switch(category){
      case "Materials":
        tempList = this.items.filter(item => item.type == "Mat");        
        break;
      case "Consumables and Misc":
        tempList = this.items.filter(item => item.type == "Misc");
        break;
      case "Specialized Tools":
        tempList = this.items.filter(item => item.type == "Tool");    
        break;
      case "Decorations":
        tempList =  this.items.filter(item => item.type == "Deco");
        break;
      case "Ammo/Coatings":
        tempList =  this.items.filter(item => item.type == "Ammo");
        break;     
    }
    
    if(tempList.length) { return tempList };
    return null;

  }

}
