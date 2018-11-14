import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { DataService } from './data.service';
import { ItemDataService } from './data/item-data.service';
import { SkillDataService } from './data/skill-data.service';
import { of } from 'rxjs/observable/of';
import { Item } from '../models/item.model';
import { Skill } from '../models/skill.model';

describe('DataService', () => {
  const items = of([new Item()]);
  const skills = of([new Skill()]);

  let dataService : DataService;
  let itemDataServiceSpy;
  let skillDataServiceSpy;

  beforeEach(() => {
    itemDataServiceSpy = jasmine.createSpyObj('ItemDataService',
      ['getItemCount', 'getItems', 'updateItem', 'addItem', 'deleteItems']);
    skillDataServiceSpy = jasmine.createSpyObj('SkillDataService', ['getSkills']);
    skillDataServiceSpy.getSkills.and.returnValue(skills);
    itemDataServiceSpy.getItems.and.returnValue(items);

    TestBed.configureTestingModule({
      providers: [
        DataService,
        { provide: ItemDataService, useValue: itemDataServiceSpy },
        { provide: SkillDataService, useValue: skillDataServiceSpy }
      ]
    });

    dataService = TestBed.get(DataService);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('#getSkills should return result of skill service getSkills', fakeAsync(() => {
    expect(skillDataServiceSpy.getSkills.calls.count())
      .toBe(1, 'service getSkills is called when dataService is instantiated');
    expect(dataService.getSkills()).toBe(skills, 'service returns skills');
  }));

  it('#getItems should return result of item service getItems', fakeAsync(() => {
    expect(itemDataServiceSpy.getItems.calls.count())
      .toBe(1, 'service getItems is called once when DataServ is instantiated');
    expect(dataService.getItems()).toBe(items, 'service returns items');
  }));

  it('#getItemCount should return result of itemService itemCount', () => {
    const stubVal = of(2);
    itemDataServiceSpy.getItemCount.and.returnValue(stubVal);
    expect(itemDataServiceSpy.getItemCount.calls.count())
      .toBe(0, 'service not called yet');
    expect(dataService.getItemCount()).toBe(stubVal, 'service result matches');
    expect(itemDataServiceSpy.getItemCount.calls.count())
      .toBe(1, 'service now called');
  });

  it('#addOrUpdateItem should call updateItem when item arg has and id property', () => {
    const itemStub = new Item();
    itemStub.id = 12;
    dataService.addOrUpdateItem(itemStub);
    expect(itemDataServiceSpy.updateItem.calls.count()).toBe(1);
    expect(itemDataServiceSpy.addItem.calls.count()).toBe(0);
  });

  it('#addOrUpdateItem should call addItem when item arg has no id property', () => {
    const itemStub = new Item();
    dataService.addOrUpdateItem(itemStub);
    expect(itemDataServiceSpy.updateItem.calls.count()).toBe(0);
    expect(itemDataServiceSpy.addItem.calls.count()).toBe(1);
  });
  
  it('#deleteItems should call service deleteItems function once', () => {
    const itemStub = new Item();
    const itemArrayStub = [itemStub]
    expect(itemDataServiceSpy.deleteItems.calls.count()).toBe(0); // before
    dataService.deleteItems(itemArrayStub);
    expect(itemDataServiceSpy.deleteItems.calls.count()).toBe(1); // after
  });
});
