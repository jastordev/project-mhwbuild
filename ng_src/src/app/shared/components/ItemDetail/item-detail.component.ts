import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { Item } from '../../models/item.model';

import { DataService } from '../../service/data.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  private item : Item;

  constructor(private data : DataService) { }

  ngOnInit() {
    if(!this.item) this.item = new Item();
  }

  changeTypeToFull() : string{
    switch(this.item.type){
      case "Mat":
        return "Material";
      case "Ammo":
        return "Ammo/Coating";
      case "Deco":
        return "Decoration"; 
      case "Misc":
        return "Consumable/Misc";
      case "Tool":
        return "Specialized Tool";
    }
  }
  

}
