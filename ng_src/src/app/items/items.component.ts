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

  objectKeys = Object.keys;

  private _items;
  private _skills : Skill[];
  private serverCount: number;
  private itemsFiltered : Item[];
  private itemsSelected;

  private category;

  private editMode : boolean;
  private searchStr : String;

  constructor(
    private _data : DataService,
    private modal : ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.editMode = false;
    this.itemsSelected = [];
    this.searchStr = "";

    this.getCategoryThenLoadData();
    //this.getTestCount();    
  }

  private getCategoryThenLoadData() {
    this.route.params.subscribe( (params) => {
      switch(params.category) {
        case 'mats':
          this.category = "Material";
          break;
        case 'deco':
          this.category = "Decoration";
          break;
        case 'ammo':
          this.category = "Ammo/Coating";
          break;
        case 'tool':
          this.category = "Specialized Tool";
          break;
        case 'misc':
          this.category = "Consumable/Misc";
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
      this._items = this.itemListSetUp(data);
      console.log(this._items);
      this.searchFilter();
      console.log(this.itemsFiltered);
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
