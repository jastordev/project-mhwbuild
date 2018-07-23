import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { Item } from '../models/item.model';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { ToastService } from './toast.service';
import { ImageUploadService } from './image-upload.service';

@Injectable()
export class ItemDataService {

  private _items : BehaviorSubject <Item[]>;
  private serverCount : BehaviorSubject <number>; // DEL
  private dataStore: {
    items: Item[]
  }; 

  constructor(private http : HttpClient, private toast : ToastService,
              private imageUpload : ImageUploadService) {
    this._items = <BehaviorSubject<Item[]>>new BehaviorSubject([]);
    this.dataStore = { items: [] };
    this.serverCount = <BehaviorSubject<number>>new BehaviorSubject(0); // DEL   
  }

  // Actual CRUD operation functions ahead.
  addItem(item : Item, iconFile? : any){
    item.iconUrl = "default/path/to/img";

    if(iconFile){
     // PICKUP HERE item.iconUrl = this.imageUpload.uploadImage(iconFile);
    }
    this.dataStore.items.unshift(item);
    this._items.next(Object.assign({}, this.dataStore).items);
    this.toast.createToast(`Successfully added ${item.name} to the item DB.`, 2);     
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
    //HTTP REQUEST HERE IF SUCCESSFUL CONTINUE
    for (let item of items) {
      let index = this.dataStore.items.indexOf(item);
      this.dataStore.items.splice(index, 1);
    }
    this._items.next(Object.assign({}, this.dataStore).items);

    // Code for success message.
    let toastMsg : string;
    if (items.length <= 1) {
      toastMsg = `Entry for ${items[0].name} has been succesfully deleted.`;
    } else {
      toastMsg = `${items.length} items have been successfully deleted.`;
    }
    this.toast.createToast(toastMsg, 2);
  }  

  getItems() : Observable <Item[]> {
    this.loadAll();
    return this._items.asObservable();
  }

  loadAll() {
    // HTTP REQUEST HERE IF SUCCESSFUL CONTINUE
    this.dataStore.items = this.returnDummyArray();
    this._items.next(Object.assign({}, this.dataStore).items);
  }

  getItemCount() : Observable<number> {
    return Observable.of(this.dataStore.items.length);
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
    newItem.iconUrl = "default/path";
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
      .get('http://localhost:4300/api/overview/test')
      .subscribe((data : number)=> {
        this.serverCount.next(data);
      });
    return this.serverCount.asObservable();
  }
  // NOTE - DELETE
  testReq(){
    this.http
      .get('http://localhost:4300/api/overview/test')
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
      .get('http://localhost:4300/api/overview/error')
      .catch((err : any) => Observable.throw(this.errorHandler(err)))
      .subscribe(data => {
        console.log(data);
      });    
  }

  errorHandler( error : any) : String{
    return ("- " + error.message);
  }

}
