import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs/observable/of';
import { DataService } from '../shared/service/data.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let countEl;
  let getItemCountSpy;
  let testCount;

  beforeEach(async(() => {
    testCount = 50;

    const dataService = jasmine.createSpyObj('DataService', 
      ['getItemCount', 'getWepCount', 'getArmCount', 'getSkillCount', 'getBuildCount']);
    getItemCountSpy = dataService.getItemCount.and.returnValue(of(testCount));

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ { provide: DataService, useValue: dataService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    countEl = fixture.nativeElement.querySelector('.list-overview').children[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the count after comp init', () => {
    expect(countEl.textContent).toContain(testCount);
    expect(getItemCountSpy.calls.any()).toBe(true, 'getItemCount should be called');
  });
});
