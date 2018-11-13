import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Item } from '../shared/models/item.model';
import { Skill } from '../shared/models/skill.model';

import { ItemDetailComponent }
  from '../shared/components/item-detail/item-detail.component';

import { DataService } from '../shared/service/data.service';
import { ModalService } from '../shared/service/modal.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'] 
})
export class ItemsComponent implements OnInit {

  private _items;
  private _skills : Skill[];
  private itemsFiltered : Item[];
  private itemsSelected;

  private category;

  private editMode : boolean;
  private toolsOpen : boolean;
  private searchOpen : boolean;
  private searchStr : String;

  constructor(
    private _data : DataService,
    private modal : ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editMode = false;
    this.itemsSelected = [];
    this.searchStr = "";
    this.toolsOpen = false;

    this.getCategoryThenLoadData();
  }

  // this.route.url returns an array in which the elems are
  // url segments (ie. 'items/mats' would be [items, mats])
  private getCategoryThenLoadData() {
    this.route.url.subscribe( (url) => {
      switch(url[1].path) {
        case 'mats':
          this.category = "Material";
          break;
        case 'deco':
          this.category = "Decoration";
          break;
        case 'ammo':
          this.category = "Ammo/Coating";
          break;
        case 'tools':
          this.category = "Specialized Tool";
          break;
        case 'misc':
          this.category = "Consumable/Misc";
          break;
        default:
          this.category = "Material";
          break;
      }
      this.loadData();
    });
  }

  private loadData(){
    this._data.skills.subscribe( data => {
      this._skills = data;
    });
    this._data.items.subscribe( data => {
      console.log("ITEM LIST OBSERVABLE - Loaded data.");
      this._items = this.itemListSetUp(data);
      this.searchFilter();
    });     
  }

  private itemListSetUp(items : Item[]) {
    let filteredItems = items.filter(item => item.type == this.category);
    if (this.category == "Decoration") {
      filteredItems.forEach((item, index) => {
        filteredItems[index]["skill"] = this._skills.find(s => s.skillId == item.skillID);
      });
    }
    return filteredItems;    
  }

  private searchFilter(){
    if(this.searchStr.trim()){
      this.itemsFiltered = this._items.filter(item => {
        return item.name.toLowerCase().includes(this.searchStr.toLowerCase());
      });      
    } else {
      this.itemsFiltered = Object.assign([],this._items);
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
    if (this.itemsSelected.length > 0 ) {
      let confirmed = confirm("Are you sure you wish to delete all selected ("
      + this.itemsSelected.length + ") entries?");
      if (confirmed){
        this._data.deleteItems(this.itemsSelected);
        this.itemsSelected = [];
      }
    }    
  }

  private selectAll(event : any){    
    if(this.itemsSelected.length == 0){
      this.itemsSelected.push(...this.itemsFiltered);
    } else {      
      this.itemsSelected = [];
    }
  }

  private showItemDetail(item : Item){
    if(!this.editMode) return;
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

  // If image does not load, replace with default.
  private imgErrHandler(event: any) {
    event.target.src = "http://localhost:4300/images/items/default_icon.png";
  }
}
