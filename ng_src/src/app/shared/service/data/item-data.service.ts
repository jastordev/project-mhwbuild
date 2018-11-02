import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { Item } from '../../models/item.model';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { ToastService } from '../toast.service';

@Injectable()
export class ItemDataService {

  private backEndDomain = "http://localhost:4300";

  private _items : BehaviorSubject <Item[]>;
  private dataStore: {
    items: Item[]
  }; 

  constructor(private http : HttpClient, private toast : ToastService) {
    this._items = <BehaviorSubject<Item[]>>new BehaviorSubject([]);
    this.dataStore = { items: [] };
  }

  getItemCount() : Observable<number> {
    return Observable.of(this.dataStore.items.length);
  }

  getItems() : Observable <Item[]> {
    this.loadAll();
    return this._items.asObservable();
  }

  private loadAll() {
    this.http
      .get(`${this.backEndDomain}/api/items/`)
      .take(1)
      .subscribe( data => {        
        this.dataStore.items = this.convertDataToItems(data);
        this._items.next(Object.assign({}, this.dataStore).items);
        console.log("ITEM DATA SERVICE - Load all Items request made."); // REMOVE
      },
      err => {
        console.log(err);
      });
  }

  // Send an add item request to the back-end server.
  addItem(item : Item, iconFile? : any){

    let itemFormData = new FormData();
    if(iconFile){
      let fileName = iconFile.type.replace("image/", ".");      
      itemFormData.append("imageFile", iconFile);
    }
    itemFormData.append('item', JSON.stringify(item));   

    this.http
      .post(`${this.backEndDomain}/api/items/`, itemFormData)
      .take(1)
      .subscribe( (data : {iconUrl : string, itemID: number}) => {
        item.iconUrl = this.backEndDomain + data.iconUrl;
        item.id = data.itemID;
        this.dataStore.items.unshift(item);
        this._items.next(Object.assign({}, this.dataStore).items);
        this.addItemToast(true);
      },
      err => {
        this.addItemToast(false, err);
      });     
  }

  // Send an update item PUT request to the back-end server.
  updateItem(item : Item, iconFile? : any){

    let itemFormData = new FormData();
    if(iconFile){
      let fileName = item.name.trim();
      fileName = fileName.replace(/ /g,"_");
      fileName += iconFile.type.replace("image/", ".");      
      itemFormData.append("imageFile", iconFile, fileName);
    }
    itemFormData.append('item', JSON.stringify(item));   

    this.http
      .put(`${this.backEndDomain}/api/items/${item.id}`, itemFormData)
      .take(1)
      .subscribe( (data : {iconUrl : string}) => {        
        item.iconUrl = this.backEndDomain + data.iconUrl;
        let index = this.dataStore.items.findIndex(storeItem => {
          return storeItem.id == item.id;
        });
        this.dataStore.items[index] = item;
        this._items.next(Object.assign({}, this.dataStore).items);
        this.updateItemToast(true);
      },
      err => {
        this.updateItemToast(false, err);
      });
  }

  // Send a DELETE item request to the back-end server.
  deleteItems(items: Item[]){
    this.http
      .delete(`${this.backEndDomain}/api/items/${this.createIDList(items)}`)
      .take(1)
      .subscribe( res => {
        for (let item of items) {
          let index = this.dataStore.items.indexOf(item);
          this.dataStore.items.splice(index, 1);
        }
        this._items.next(Object.assign({}, this.dataStore).items);
        this.deleteItemToast(true);
      },
      err => {
        this.deleteItemToast(false, err);
      });
  }  

  // HELPER FUNCTIONS
  // =============================================
  // Delete items helper method. Creates a list (string) of all items' ids.
  private createIDList(items: Item[]) {
    let itemIds = [];
    for (let item of items) {
      itemIds.push(item.id);
    }
    return itemIds.join(',');
  }

  // Converts back-end response data to an array of Items
  private convertDataToItems(data) {
    let itemList : Item[] = [];
    for (let entry of data) {      
      entry.IconPath = this.backEndDomain + entry.IconPath;
      itemList.push(this.convertDBEntryToItem(entry));
    }
    return itemList;
  }

  // Converts the back-end item (DB Schema) to a front-end item (Item Model)
  private convertDBEntryToItem(entry){
    let newItem = new Item();
    newItem.id = entry.ID;
    newItem.iconUrl = entry.IconPath;
    newItem.name = entry.Name;
    newItem.desc = entry.Description;
    newItem.type = entry.Type;
    newItem.rarity = entry.Rarity;
    newItem.carry = entry.Carry;
    newItem.obtainedFrom = entry.ObtainedFrom;
    newItem.sellPrice = entry.SellPrice;
    newItem.buyPrice = entry.BuyPrice;
    newItem.skillID = entry.SkillID;
    newItem.jwlLvl = entry.JewelLevel;
    return newItem;
  }

  // Creates a toast notification according to the result of the
  // respective operation.
  private addItemToast(success : boolean, errMsg? : string) {
    if (success) {
      this.toast.createToast("Item added successfully.", 2);
    } else {
      this.toast.createToast("Item could not be added. " + errMsg, 0);
    }
  }

  private updateItemToast(success : boolean, errMsg? : string) {
    if (success) {
      this.toast.createToast("Item has been updated successfully.", 2);
    } else {
      this.toast.createToast("Item could not be updated. " + errMsg, 0);
    }
  }

  private deleteItemToast(success : boolean, errMsg? : string) {
    if (success) {      
      this.toast.createToast("Item/s have been successfully deleted", 2);
    } else {
      this.toast.createToast("Item/s could not be deleted. " + errMsg, 0);
    }
  }

  errorHandler( error : any) : String{
    return ("- " + error.message);
  }

}
