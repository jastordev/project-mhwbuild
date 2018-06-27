import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { Item } from '../shared/models/item.model';
import { ItemDetailComponent }
  from '../shared/components/ItemDetail/item-detail.component';

import { DataService } from '../shared/service/data.service';
import { ModalService } from '../shared/service/modal.service';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  private _items : Item[];
  itemsFiltered : Item[];
  itemsSelected : Item[];
  categories : string[];

  // Variables which toggle allowed categories.
  private allowMat : boolean;
  private allowAmmo : boolean;
  private allowDeco : boolean;
  private allowMisc : boolean;
  private allowTool : boolean;

  private editMode : boolean;

  // Class name for item entries
  private entryClassName : string; 

  constructor(private _data : DataService,
    private modal : ModalService, private _elem: ElementRef) { }

  ngOnInit() {
    this.categories = ["Materials", "Ammo/Coatings", "Consumables and Misc", 
       "Decorations", "Specialized Tools"];

    this.allowAmmo = true;
    this.allowDeco = true;
    this.allowMat = true;
    this.allowMisc = true;
    this.allowTool = true;

    this.editMode = false;

    this.entryClassName = "list-item";

    this.loadData();
    this.itemsSelected = [];
  }

  loadData(){
    this._data.items.subscribe( data => {
      this._items = data;
      this.itemsFiltered = this._items;
    })
  }

  itemsPerCategory(category : string) : Item[] {
    
    let tempList : Item[] = [];

    switch(category){
      case "Materials":
        if(this.allowMat)
          tempList = this.itemsFiltered.filter(item => item.type == "Material");        
        break;
      case "Consumables and Misc":
        if(this.allowMisc) 
          tempList = this.itemsFiltered.filter(item => item.type == "Consumable/Misc");
        break;
      case "Specialized Tools":
        if(this.allowTool) 
          tempList = this.itemsFiltered.filter(item => item.type == "Specialized Tool");    
        break;
      case "Decorations":
        if(this.allowDeco) 
          tempList =  this.itemsFiltered.filter(item => item.type == "Decoration");
        break;
      case "Ammo/Coatings":
        if(this.allowAmmo) 
          tempList =  this.itemsFiltered.filter(item => item.type == "Ammo/Coating");
        break;     
    }

    if(tempList.length) { return tempList };
    return null;

  }

  onCatClick(event : any, category : string){
    switch(category){
      case "mat":
        this.allowMat = !this.allowMat;
        break;
      case "ammo":
        this.allowAmmo = !this.allowAmmo;
        break;
      case "deco":
        this.allowDeco = !this.allowDeco;    
        break;
      case "misc":
        this.allowMisc = !this.allowMisc; 
        break;
      case "tool":
        this.allowTool = !this.allowTool; 
        break;     
    }
  }

  onItemClick(event : any, item : Item) {
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

  onSelectClick(event : any){    
    if(this.itemsSelected.length == 0){      
      this.itemsSelected = Array.from(this.itemsFiltered);      
    } else {      
      this.itemsSelected = [];
    }
  }

  searchFilter(event : any){
    let searchStr = event.target.value.toLowerCase();      

    this.itemsFiltered = this._items.filter(item => {
      return item.name.toLowerCase().includes(searchStr);
    })
  }

  showItemDetail(item : Item){
    let input = {
      item : item,
      isForm : this.editMode
    }
    this.modal.init(ItemDetailComponent, input, {});
  }

  addNewItem(){
    let input = {
      isForm : true
    }
    this.modal.init(ItemDetailComponent, input, {});
  }

  toggleEditMode(event : any){
    this.editMode = !this.editMode;
    if (this.editMode) {     
      event.target.innerHTML = "Edit Mode On";
    } else {
      event.target.innerHTML = "Edit Mode Off";
    }
  }


}
