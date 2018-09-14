import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { Item } from '../shared/models/item.model';
import { Skill } from '../shared/models/skill.model';

import { ItemDetailComponent }
  from '../shared/components/item-detail/item-detail.component';

import { DataService } from '../shared/service/data.service';
import { ModalService } from '../shared/service/modal.service';
import { ElementRef, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  objectKeys = Object.keys;

  private _items;
  private _skills : Skill[];
  private serverCount: number;
  private itemsFiltered;
  private itemsSelected;

  private categoryToggle = {}

  private editMode : boolean;
  private searchStr : String;

  constructor(private _data : DataService,
    private modal : ModalService, private _elem: ElementRef,
    private changeDetector: ChangeDetectorRef ) {
      //this.changeDetector.detach();
    }

  ngOnInit() {
    this.categoryToggle = {
      "Material" : true,
      "Consumable/Misc" : true,
      "Specialized Tool" : true,
      "Decoration" : true,
      "Ammo/Coating" : true
    }

    this.editMode = false;

    this.itemsSelected = [];
    this.searchStr = "";
    this.getTestCount();
    this.loadData();
  }

  loadData(){
    this._data.skills.subscribe( data => {
      this._skills = data;
    });
    this._data.items.subscribe( data => {
      this._items = this.itemsSortByCategory(data);
      this.searchFilter();
    });     
  }

  private itemsSortByCategory(items : Item[]){
    let categories = ["Material", "Consumable/Misc", "Specialized Tool", "Decoration", "Ammo/Coating"];
    let sortedItems = {};
    for (let cat of categories) {
      sortedItems[cat] = items.filter(item => item.type == cat);
      if(cat == "Decoration") {
        sortedItems[cat].forEach((item, index) => {
          sortedItems[cat][index]["skill"] = this._skills.find(s => s.skillId == item.skillID);
        });
      }
    }
    return sortedItems;
  } 

  private searchFilter(){
    if(this.searchStr.trim()){
      for (var category in this._items){
        this.itemsFiltered[category] = this._items[category].filter(item => {
          return item.name.toLowerCase().includes(this.searchStr.toLowerCase());
        });
      }
    } else {
      this.itemsFiltered = Object.assign({},this._items);
    }
  }

  private addNewItem(){
    let input = {
      isForm : true,
      skills : this._skills
    }
    this.modal.init(ItemDetailComponent, input, {});
  }

  private deleteSelected(){
    if (this.itemsSelected.length == 0 ) return;
    let confirmed = confirm("Are you sure you wish to delete all selected ("
      + this.itemsSelected.length + ") entries?");
    if (confirmed){
      this._data.deleteItems(this.itemsSelected);
      this.itemsSelected = [];
    }
  }

  private selectAll(event : any){    
    if(this.itemsSelected.length == 0){      
      this.itemsSelected = Array.from(this.itemsFiltered);      
    } else {      
      this.itemsSelected = [];
    }
  }

  private toggleEditMode(event : any){
    this.editMode = !this.editMode;
    if (this.editMode) {     
      event.target.innerHTML = "Edit Mode On";
    } else {
      event.target.innerHTML = "Edit Mode Off";
    }
  }

  private showItemDetail(item : Item){
    let input = {
      item : item,
      isForm : this.editMode,
      skills : this._skills
    }
    this.modal.init(ItemDetailComponent, input, {});
  }

  private onItemClick(event : any, item : Item) {
    if(event.ctrlKey){          
      if (this.itemsSelected.includes(item)){
        this.itemsSelected.splice(this.itemsSelected.indexOf(item), 1);
      } else {
        this.itemsSelected.push(item);
      }     
    } else {
      this.showItemDetail(item);
    }    
  }

  toggleCat(event : any, category : string){
    this.categoryToggle[category] = !this.categoryToggle[category];
  }

  testError(){
    this._data.testError();
  }
  
  testReq(){
    this._data.testReq();
  }

  getTestCount(){
    this._data.getTestCount()
      .subscribe( data => {
        this.serverCount = data;
      });
  }
}
