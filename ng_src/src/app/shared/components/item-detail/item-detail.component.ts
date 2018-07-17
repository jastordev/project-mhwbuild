import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import '../../validators/item.validator';

import { Item } from '../../models/item.model';

import { DataService } from '../../service/data.service';
import { validateType } from '../../validators/item.validator';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  // These variables are passed in as inputs.
  private item : Item; 
  private isForm : boolean;
  private formSubmitted : boolean;
  
  private types = ["Material", "Consumable/Misc",
    "Specialized Tool", "Decoration", "Ammo/Coating"];
  private rarities = [1, 2, 3, 4, 5, 6, 7, 8];

  private itemForm: FormGroup;

  constructor(private data : DataService, private fb : FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    if(this.isForm){      
      this.formSubmitted = false;

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
          jwlLvl : this.item.jwlLvl || null
        });
      }    
    }
    
  }

  createForm(){
    const DigitOnly = "^[0-9]*$";

    this.itemForm = this.fb.group({
      id : ['', Validators.pattern(DigitOnly)],
      name : ['', 
        [ Validators.required,
          Validators.minLength(2), Validators.maxLength(35)] ],
      rarity : [1, 
        [ Validators.required, Validators.pattern("^[1,2,3,4,5,6,7,8]{1}$")] ],
      type : ['Material',
        [ Validators.required, validateType ] ],
      desc : ['', 
        [ Validators.required,
          Validators.minLength(5), Validators.maxLength(120)] ],
      buy : ['', 
        [ Validators.maxLength(7), Validators.pattern(DigitOnly)] ],
      sell : ['',
        [ Validators.maxLength(7), Validators.pattern(DigitOnly)] ],
      carry : ['', 
        [ Validators.pattern(DigitOnly), Validators.maxLength(2)] ],
      obtained : [ '', Validators.maxLength(120) ],
      skillID : ['', Validators.pattern(DigitOnly)],
      jwlLvl : ['', Validators.pattern("^[1,2,3]?$") ]        
    });
  }

  onSubmit(event : any){
    this.formSubmitted = true;
    
    if(this.itemForm.valid){
      this.data.addOrUpdateItem(this.convertToItem(this.itemForm.value));
      this.itemForm.reset(this.itemForm.value);
      this.formSubmitted = false;
    }
  }

  convertToItem(formValue : any) : Item{
    let item = new Item();
    item.id = +formValue.id;
    item.name = formValue.name;
    item.desc = formValue.desc;
    item.type = formValue.type;
    item.rarity = +formValue.rarity;
    item.obtainedFrom = formValue.obtained;
    item.carry = +formValue.carry;
    item.buyPrice = +formValue.buy;
    item.sellPrice = +formValue.sell;
    item.skillID = +formValue.skillID;
    item.jwlLvl = +formValue.jwlLvl;
    return item;
  }

  isModalDirty() : boolean {
    if (!this.isForm) return false;
    return this.itemForm.dirty;
  } 

  uploadImg() {
    alert("Image being uploaded!");
  }

}
