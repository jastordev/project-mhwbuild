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
  private serverCount : BehaviorSubject <number>; // DEL
  private dataStore: {
    items: Item[]
  }; 

  constructor(private http : HttpClient, private toast : ToastService) {
    this._items = <BehaviorSubject<Item[]>>new BehaviorSubject([]);
    this.dataStore = { items: [] };
    this.serverCount = <BehaviorSubject<number>>new BehaviorSubject(0); // DEL   
  }

  // Actual CRUD operation functions ahead.
  addItem(item : Item, iconFile? : any){
    let itemFormData = new FormData();

    if(iconFile){
      let fileName = item.name.trim();
      fileName = fileName.replace(/ /g,"_");
      fileName += iconFile.type.replace("image/", ".");      
      itemFormData.append("imageFile", iconFile, fileName);
    }
    itemFormData.append('item', JSON.stringify(item));   

    this.http
      .post(this.backEndDomain + '/api/items/', itemFormData)
      .take(1)
      .subscribe( (data : {iconUrl : string, itemID: number}) => {
        this.toast
        .createToast("[Success] Item added successfully.", 2);
        item.iconUrl = this.backEndDomain + data.iconUrl;
        item.id = data.itemID;
        this.dataStore.items.unshift(item);
        this._items.next(Object.assign({}, this.dataStore).items);
      },
      err => {
        this.toast
        .createToast("[Error] Add Item operation has failed.", 0);
      });

    // this.dataStore.items.unshift(item);
    // this._items.next(Object.assign({}, this.dataStore).items);
    // this.toast.createToast(`Successfully added ${item.name} to the item DB.`, 2);     
  }

  updateItem(item : Item){
    //HTTP REQUEST HERE IF SUCCESSFUL CONTINUE
    let index = this.dataStore.items.findIndex(storeItem => {
      return storeItem.id == item.id;
    });
    this.dataStore.items[index] = item;
    this._items.next(Object.assign({}, this.dataStore).items);
    this.toast.createToast(`The entry for ${item.name} has been updated.`, 2);
  }

  deleteItems(items: Item[]){
    this.http
      .delete(this.backEndDomain + '/api/items/' + this.createIDList(items))
      .take(1)
      .subscribe( res => {
        for (let item of items) {
          let index = this.dataStore.items.indexOf(item);
          this.dataStore.items.splice(index, 1);
        }
        this.deleteItemToast(true);
        this._items.next(Object.assign({}, this.dataStore).items);
      },
      err => {
        this.deleteItemToast(false, err);
        console.log(err);
      });
  }  

  // Delete items helper method. Creates a list (string) of all items' ids.
  private createIDList(items: Item[]) {
    let itemIds = [];
    for (let item of items) {
      itemIds.push(item.id);
    }
    return itemIds.join(',');
  }

  // Delete items toast notification helper method. 
  private deleteItemToast(success : boolean, errMsg? : string) {
    let toastMsg : string;
    if (success) {      
      toastMsg = "Item/s have been successfully deleted";
      this.toast.createToast(toastMsg, 2);
    } else {
      toastMsg = "Item/s could not be deleted." + errMsg;
      this.toast.createToast(toastMsg, 0);
    }
  }

  getItems() : Observable <Item[]> {
    this.loadAll();
    return this._items.asObservable();
  }

  private loadAll() {
    this.http
      .get(this.backEndDomain + '/api/items/')
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

  getItemCount() : Observable<number> {
    return Observable.of(this.dataStore.items.length);
  }

  private convertDataToItems(data) {
    let itemList : Item[] = [];
    for (let entry of data) {      
      entry.IconPath = this.backEndDomain + entry.IconPath;
      itemList.push(this.convertDBEntryToItem(entry));

    }
    return itemList;
  }

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

  //
  // DUMMY DATA/TEST FUNCTIONS REMOVE WHEN DONE
  // 
  // Ahead are functions purely meant for dummydata/testing REMOVE
  returnDummyArray() : Item[] {
    let newItem  = [this.returnDummyItem(1, "Material"),
         this.returnDummyItem(2, "Consumable/Misc", "Zorah Magdaros Heat Scale"),
         this.returnDummyItem(3, "Material"),
         this.returnDummyItem(4, "Consumable/Misc")];
    return newItem;
  }

  returnDummyItem(id : number, cat : string, name? : string) : Item {
    let newItem = new Item();
    newItem.iconUrl = this.backEndDomain + "/images/items/default_icon.png";
    newItem.id = id;
    newItem.name = (name) ? name : "Iron Ore" + id;
    newItem.desc = "Ore that can be smelted into metal and used for many purposes";
    newItem.type = cat;
    newItem.rarity = 4;
    newItem.obtainedFrom = "Mining, Quest Rewards, Palico";
    newItem.carry = 99;
    newItem.sellPrice = 60;
    newItem.buyPrice = 0;
    newItem.skillID = 0;
    newItem.jwlLvl = 0;    
    return newItem;
  }

  // NOTE - DELETE
  getTestCount(){
    this.http
      .get(this.backEndDomain + '/api/overview/test')
      .subscribe((data : number)=> {
        this.serverCount.next(data);
      });
    return this.serverCount.asObservable();
  }
  // NOTE - DELETE
  testReq(){
    this.http
      .get(this.backEndDomain + '/api/overview/test')
      .take(1)
      .subscribe( data => {
        this.serverCount.next(+data);
        this.toast
        .createToast("The test HTTP Request has succeeded.", 2);
      },
      err => {
        this.serverCount.next(99);
        this.toast
        .createToast("The test HTTP request has returned with an error.", 0);
      });
  }

  // NOTE - DELETE
  testHttpError(){
    let httpRes = { success: true };    
    // HTTP REQUEST HERE, IF SUCCESSFUL CONTINUE
    this.http
      .get(this.backEndDomain + '/api/overview/error')
      .catch((err : any) => Observable.throw(this.errorHandler(err)))
      .subscribe(data => {
        console.log(data);
      });    
  }

  errorHandler( error : any) : String{
    return ("- " + error.message);
  }

}
