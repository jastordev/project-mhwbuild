import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ItemDataService } from './item-data.service';
import { skip } from 'rxjs/operators';
import { ToastService } from '../toast.service';
import { Item } from '../../models/item.model';
import { Observable } from 'rxjs/Observable';

describe('ItemDataService', () => {
  let backEndDomain = "http://localhost:4300";

  let itemDataService : ItemDataService;
  let toastServiceSpy : ToastService;
  let httpTestingController;
  let emitCounter;

  const backEndItems = [
    { ID : 1,
      IconPath: '/some/icon-path.png',
      Name: 'Test Name',
      Description: 'Test Description',
      Type: 'Material',
      Rarity: 3,
      Carry: 3,
      ObtainedFrom: "somewhere",
      SellPrice: 230,
      BuyPrice: 230,
      SkillID: null,
      JewelLevel: null },
    { ID : 2,
      IconPath: '/some/icon-path2.png',
      Name: 'Test Name 233',
      Description: 'Test Description',
      Type: 'Decoration',
      Rarity: 3,
      Carry: 3,
      ObtainedFrom: "somewhere",
      SellPrice: 230,
      BuyPrice: 230,
      SkillID: null,
      JewelLevel: null },
  ];
  
  function dataToItemList(data) {
    let itemList : Item[] = [];
    for (let entry of data) {      
      let newItem = new Item();
      newItem.id = entry.ID;
      newItem.iconUrl = backEndDomain + entry.IconPath;
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
      itemList.push(newItem);
    }
    return itemList;
  }

  function returnTestItem(){
    let testItem = new Item();
    testItem.id = null;
    testItem.iconUrl = null;
    testItem.name = 'Test Item Add/Update';
    testItem.desc = 'Test Desc';
    testItem.type = 'Material';
    testItem.rarity = 3;
    testItem.carry = 23;
    testItem.obtainedFrom = "places";
    testItem.sellPrice = 2334;
    testItem.buyPrice = 2312;
    testItem.skillID = null;
    testItem.jwlLvl = null;
    return testItem;
  }

  beforeEach(() => {
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['createToast']);
    TestBed.configureTestingModule({
      providers: [
        ItemDataService,
        { provide: ToastService, useValue: toastServiceSpy }
      ],
      imports: [ HttpClientTestingModule ]
    });
    itemDataService = TestBed.get(ItemDataService);
    httpTestingController = TestBed.get(HttpTestingController);

    // Establish that initial request to get items has been made
    const loadAllReq = httpTestingController.expectOne(`${backEndDomain}/api/items/`);
    expect(loadAllReq.request.method).toEqual('GET'); 
    loadAllReq.flush(backEndItems);
    httpTestingController.verify();
    emitCounter = 0;
  });

  it('should be created', () => {
    expect(itemDataService).toBeTruthy();
  });

  it('should load items from the backend when service is instantiated', fakeAsync(() => {
    // Prepare processed item list.
    let itemList : Item[] = dataToItemList(backEndItems);

    // Only compare second emission, since first one is the inital value of the BehaviorSubject
    itemDataService.getItems().subscribe(data => {
      expect(data).toEqual(itemList);
    });
  }));

  it('#getItemCount should return the amount of items stored', () => {    
    itemDataService.getItemCount().subscribe(data => {
      expect(data).toEqual(2);
    });
    httpTestingController.verify();    
  });

  it('#addItem should add item to dataStore on success', () => {    
    // Prepare and attempt to add item.
    let testItem = returnTestItem();
    itemDataService.addItem(testItem);

    // When the observable updates, check if the added item is there.
    itemDataService.getItems().pipe(skip(1)).subscribe(data => {
      expect(data).toContain(testItem);
      emitCounter++;
    });

    // Expect POST request made when adding an item.
    const req = httpTestingController.match(`${backEndDomain}/api/items/`);
    expect(req.length).toEqual(1);
    expect(req[0].request.method).toEqual('POST'); 
    req[0].flush({iconUrl: '/images/items/default_icon.png', itemID: 23});

    expect(emitCounter).toBe(1);

    // Expect toast service to be called with success param.
    expect(toastServiceSpy.createToast).toHaveBeenCalledTimes(1);
    expect(toastServiceSpy.createToast).toHaveBeenCalledWith(jasmine.any(String), 2);
  });

  it('#addItem should not add anything on server error', () => {
    // Prepare and attempt to add item.
    let testItem = returnTestItem();
    itemDataService.addItem(testItem);

    // If observable emits, fail the test
    itemDataService.getItems().pipe(skip(1)).subscribe(data => {
      expect(true).toEqual(false);
    });

    // Expect POST request made when adding an item.
    const req = httpTestingController.match(`${backEndDomain}/api/items/`);
    expect(req.length).toEqual(1);
    expect(req[0].request.method).toEqual('POST'); 
    req[0].flush('Bad times man.', { status: 400, statusText: 'Bad request'});

    // Expect toast service to be called with error param.
    expect(toastServiceSpy.createToast).toHaveBeenCalledTimes(1);
    expect(toastServiceSpy.createToast).toHaveBeenCalledWith(jasmine.any(String), 0);
  });

  it('#updateItem should update item on success', () => {
    // Prepare item that will be updated.
    let testItem = returnTestItem();
    testItem.id = 2;
    itemDataService.updateItem(testItem);

    // Make sure the items observable emits with an updated value.
    itemDataService.getItems().pipe(skip(1)).subscribe(data => {
      let itemWithID2 = data.find(item => item.id == 2);
      expect(itemWithID2.name).toBe('Test Item Add/Update');
      expect(data.length).toBe(2);
      emitCounter++;
    });

    // Expect POST request made when adding an item.
    const req = httpTestingController.match(`${backEndDomain}/api/items/${testItem.id}`);
    expect(req.length).toEqual(1);
    expect(req[0].request.method).toEqual('PUT'); 
    req[0].flush({ iconUrl: '/images/items/default_icon.png' });

    expect(emitCounter).toBe(1);    

    // Expect toast service to be called with success param.
    expect(toastServiceSpy.createToast).toHaveBeenCalledTimes(1);
    expect(toastServiceSpy.createToast).toHaveBeenCalledWith(jasmine.any(String), 2);
  });

  it('#updateItem should not modify the item on server error', () => {
    // Prepare item that will be updated.
    let testItem = returnTestItem();
    testItem.id = 2;
    itemDataService.updateItem(testItem);

    // Make sure the items observable does not emit anything other than initial val.
    itemDataService.getItems().pipe(skip(1)).subscribe(data => {
      expect(true).toBe(false);
    });

    // Expect PUT request made when adding an item.
    const req = httpTestingController.match(`${backEndDomain}/api/items/${testItem.id}`);
    expect(req.length).toEqual(1);
    expect(req[0].request.method).toEqual('PUT'); 
    req[0].flush('Bad times man.', { status: 400, statusText: 'Bad request'});
  
    // Expect toast service to be called with error param.
    expect(toastServiceSpy.createToast).toHaveBeenCalledTimes(1);
    expect(toastServiceSpy.createToast).toHaveBeenCalledWith(jasmine.any(String), 0);
  });

  it('#deleteItem should remove item on success', () => {
    let itemList = dataToItemList(backEndItems);
    let itemOfID1 = itemList[0];
    itemDataService.deleteItems([itemOfID1]);

    itemDataService.getItems().pipe(skip(1)).subscribe(data => {
      let deletedItem = data.find(item => item == itemOfID1);
      expect(deletedItem).toBeUndefined();
      expect(data.length).toBe(1);
      emitCounter++;
    });

    const req = httpTestingController.expectOne(`${backEndDomain}/api/items/${itemOfID1.id}`);
    expect(req.request.method).toEqual('DELETE'); 
    req.flush('Item deleted.');

    expect(emitCounter).toBe(1);

    // Expect toast service to be called with success param.
    expect(toastServiceSpy.createToast).toHaveBeenCalledTimes(1);
    expect(toastServiceSpy.createToast).toHaveBeenCalledWith(jasmine.any(String), 2);
  });

  it('#deleteItem should delete all items on success', () => {
    let itemList = dataToItemList(backEndItems);
    itemDataService.deleteItems(itemList);

    itemDataService.getItems().pipe(skip(1)).subscribe(data => {
      expect(data).not.toBe(itemList);
      expect(data.length).toBe(0);
      emitCounter++;
    });

    const req = httpTestingController.expectOne(`${backEndDomain}/api/items/1,2`);
    expect(req.request.method).toEqual('DELETE'); 
    req.flush('Item deleted.');

    expect(emitCounter).toBe(1);

    // Expect toast service to be called with success param.
    expect(toastServiceSpy.createToast).toHaveBeenCalledTimes(1);
    expect(toastServiceSpy.createToast).toHaveBeenCalledWith(jasmine.any(String), 2);
  });

  it('#deleteItem should not remove the item on server error', () => {
    let itemList = dataToItemList(backEndItems);
    let itemOfID1 = itemList[0];
    itemDataService.deleteItems([itemOfID1]);

    itemDataService.getItems().pipe(skip(1)).subscribe(data => {
      expect(true).toBe(false);
    });

    const req = httpTestingController.expectOne(`${backEndDomain}/api/items/${itemOfID1.id}`);
    expect(req.request.method).toEqual('DELETE'); 
    req.flush('Doesnt work', { status: 400, statusText: 'Bad request.'});

    // Expect toast service to be called with success param.
    expect(toastServiceSpy.createToast).toHaveBeenCalledTimes(1);
    expect(toastServiceSpy.createToast).toHaveBeenCalledWith(jasmine.any(String), 0);
  });


});
