import { Component, OnInit, AnimationStyles } from '@angular/core';
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
    if(!this.item) {
       this.item = new Item();
    } else {
      this.itemForm.setValue({
        id : this.item.id,
        name : this.item.name,
        rarity : this.item.rarity,
        type : this.item.type,
        desc : this.item.desc,
        buy : this.item.buyPrice || null,
        sell : this.item.sellPrice || null,
        carry : this.item.carry,
        obtained : this.item.obtainedFrom,
        skillID : this.item.skillID || null,
        jewelLvl : this.item.jwlLvl || null
      });
    }    
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

  onSubmit(event : any){
    this.data.itemAddOrUpdate(this.itemForm.value as Item);
  }

  convertToItem(formValue : any){
    let item = new Item();
    item.id = formValue.id;
  }
  

}
