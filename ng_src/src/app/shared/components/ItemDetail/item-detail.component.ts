import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Item } from '../../models/item.model';

import { DataService } from '../../service/data.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  private item : Item;

  private types = ["Material", "Consumable/Misc",
    "Specialized Tool", "Decoration", "Ammo/Coating"];
  private rarities = [1, 2, 3, 4, 5, 6, 7, 8];

  itemForm: FormGroup;

  constructor(private data : DataService, private fb : FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    if(!this.item) this.item = new Item();
    this.itemForm.setValue({
      id : this.item.id,
      name : this.item.name,
      rarity : this.item.rarity,
      type : this.changeTypeToFull(),
      desc : this.item.desc,
      buy : this.item.buyPrice || 0,
      sell : this.item.sellPrice,
      carry : this.item.carry,
      obtained : this.item.obtainedFrom,
      skillID : this.item.skillID || 0,
      jewelLvl : this.item.jwlLvl || 0
    });
  }

  createForm(){
    this.itemForm = this.fb.group({
      id : '',
      name : '',
      rarity : '',
      type : '',
      desc : '',
      buy : '',
      sell : '',
      carry : '',
      obtained : '',
      skillID : '',
      jewelLvl : ''
    });
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

  onSubmit(event : any){
    console.log(event.value);
  }
  

}
