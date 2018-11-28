import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ItemsComponent } from './items.component';

import { FormsModule } from '@angular/forms';
import { DataService } from '../shared/service/data.service';
import { ModalService } from '../shared/service/modal.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Item } from '../shared/models/item.model';
import { Skill } from '../shared/models/skill.model';
import { eventNames } from 'cluster';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let dataServiceSpy;
  let modalServiceSpy;

  let testSkill : Skill;
  let testItems : Item[];

  function createTestItemArray() {
    let itemArray : Item[] = [];
    for (let i = 1; i<=5; i++ ) {
      let matType;
      switch(i){
        case 1: matType = 'Material'; break;
        case 2: matType = 'Decoration'; break;
        case 3: matType = 'Ammo/Coating'; break;
        case 4: matType = 'Specialized Tool'; break;
        case 5: matType = 'Consumable/Misc'; break;
      }      
      let newItem = new Item();
      newItem.id = i;
      newItem.iconUrl = "default_icon.png";
      newItem.name = `Test Name - ${matType}`;
      newItem.desc = `Test Desc ${i}`;
      newItem.type = matType;
      newItem.rarity = i;
      newItem.carry = i;
      newItem.obtainedFrom = `Some place after ${i} times`;
      newItem.sellPrice = i;
      newItem.buyPrice = i;
      newItem.skillID = i == 2 ? 1 : null;
      newItem.jwlLvl = i == 2 ? 1 : null;
      itemArray.push(newItem);
    }
    return itemArray;
  }

  function createTestItemArrayMultipleOneCat() {
    let itemArray : Item[] = [];
    for (let i = 1; i<=3; i++ ) {
      let newItem = new Item();
      newItem.id = i;
      newItem.iconUrl = "default_icon.png";
      newItem.name = `Test Name - ${i}`;
      newItem.desc = `Test Desc ${i}`;
      newItem.type = 'Material';
      newItem.rarity = i;
      newItem.carry = i;
      newItem.obtainedFrom = `Some place after ${i} times`;
      newItem.sellPrice = i;
      newItem.buyPrice = i;
      newItem.skillID = null;
      newItem.jwlLvl = null;
      itemArray.push(newItem);
    }
    return itemArray;
  }

  function createTestSkill(){
    let skill = new Skill();
    skill.skillId = 1;
    skill.skillLvls = [{skillLvl: 1, lvlDesc: 'Something'}];
    skill.iconPath = "default_icon.png";
    skill.name = "Test Skill";
    skill.desc = "Absolute trash skill";
    return skill;
  } 

  const keyUpEvent = new Event('keyup', {
    bubbles : true, cancelable : true
  });

  beforeEach(async(() => {
    testSkill = createTestSkill();
    testItems = createTestItemArray();

    dataServiceSpy = jasmine.createSpyObj('DataService', ['getItems', 'getSkills',
      'addOrUpdateItem', 'deleteItems']);
    dataServiceSpy.getSkills.and.returnValue(of([testSkill]));
    dataServiceSpy.getItems.and.returnValue(of(testItems));
    modalServiceSpy = jasmine.createSpyObj('ModalService', ['destroy', 'init']);

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ItemsComponent ],
      providers:  [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy },        
        { provide: ActivatedRoute, useValue: {
            url: Observable.of([{path: 'items'}, {path: 'mats'}])
        } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all items of category material successfully', () => {
    // Route set-up and component creation
    TestBed.get(ActivatedRoute).url = of([{path: 'items'}, {path: 'mats'}]);
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let items = fixture.nativeElement.querySelector('.item-card-container');
    expect(items.querySelector(".item-card-name").textContent).toContain("Material");
    expect(items.querySelector(".item-card-skill")).toBeNull();
  });

  it('should render all items of category ammo/coating successfully', () => {
    // Route set-up and component creation
    TestBed.get(ActivatedRoute).url = of([{path: 'items'}, {path: 'ammo'}]);
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let items = fixture.nativeElement.querySelector('.item-card-container');
    expect(items.querySelector(".item-card-name").textContent).toContain("Ammo/Coating");
    expect(items.querySelector(".item-card-skill")).toBeNull();
  });

  it('should render all items of category consumables successfully', () => {
    // Route set-up and component creation
    TestBed.get(ActivatedRoute).url = of([{path: 'items'}, {path: 'misc'}]);
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let items = fixture.nativeElement.querySelector('.item-card-container');
    expect(items.querySelector(".item-card-name").textContent).toContain("Consumable/Misc");
    expect(items.querySelector(".item-card-skill")).toBeNull();
  });

  it('should render all items of category tools successfully', () => {
    // Route set-up and component creation
    TestBed.get(ActivatedRoute).url = of([{path: 'items'}, {path: 'tools'}]);
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let items = fixture.nativeElement.querySelector('.item-card-container');
    expect(items.querySelector(".item-card-name").textContent).toContain("Specialized Tool");
    expect(items.querySelector(".item-card-skill")).toBeNull();
  });

  it('should render all items of category decoration successfully', () => {
    // Route set-up and component creation
    TestBed.get(ActivatedRoute).url = of([{path: 'items'}, {path: 'deco'}]);
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let items = fixture.nativeElement.querySelector('.item-card-container');
    expect(items.querySelector(".item-card-name").textContent).toContain("Decoration");
    expect(items.querySelector(".item-card-skill")).not.toBeNull();
  });

  it('clicking the search button should toggle the search bar', fakeAsync(() => {
    let searchBtn = fixture.nativeElement.querySelector('.search-btn');
    let searchBar = fixture.nativeElement.querySelector('.tools-search');

    expect(searchBar.classList).not.toContain('search-pulled');
    searchBtn.click();
    
    fixture.detectChanges();
    expect(searchBar.classList).toContain('search-pulled');

  }));

  it('should render search results appropriately', fakeAsync(() => {
    let testSearchItems = createTestItemArrayMultipleOneCat();
   
    dataServiceSpy.getItems.and.returnValue(of(testSearchItems));
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
        
    let searchInput = fixture.nativeElement.querySelector('.search');

    let renderedItems = fixture.nativeElement.querySelectorAll('.item-card-container');
    expect(renderedItems.length).toBe(3);

    searchInput.value = "1";
    searchInput.dispatchEvent(new Event('input')); // Update ngModel
    searchInput.dispatchEvent(new Event('keyup')); // Trigger filter method
    tick();
    fixture.detectChanges();

    renderedItems = fixture.nativeElement.querySelectorAll('.item-card-container');  
    expect(renderedItems.length).toBe(1);
  }));

  it('should open an add new item modal when the add item btn is clicked', () => {
    expect(false).toBeTruthy();
  });

  it('should open an edit item modal when a particular item is clicked with editMode on', () => { 
    expect(false).toBeTruthy();
  });

  it('ctrlClick on an item should select it', () => { 
    expect(false).toBeTruthy();
  });

  it('hitting the select button should select all items, likewise for deselect', () => {
    expect(false).toBeTruthy();
  });


});
