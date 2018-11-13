import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { RouterLinkDirectiveStub } from '../shared/testing/router-link-directive-stub';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';

@Component({ template: '' })
class MockComponent {}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let linkDes;
  let routerLinks;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarComponent, RouterLinkDirectiveStub ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('all items links must point to their respective paths', () => {
    expect(routerLinks[0].linkParams).toBe('/items');
    expect(routerLinks[1].linkParams).toBe('/items/mats');
    expect(routerLinks[2].linkParams).toBe('/items/ammo');
    expect(routerLinks[3].linkParams).toBe('/items/misc');
    expect(routerLinks[4].linkParams).toBe('/items/deco');
    expect(routerLinks[5].linkParams).toBe('/items/tools');
  });

  it('can click /items/mats link and it will direct to /items/mats', () => {
    const itemsMatsLinkDe = linkDes[1];
    const itemsMatsLink = routerLinks[1];

    expect(itemsMatsLink.navigatedTo).toBeNull('should not have navigated');
    itemsMatsLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(itemsMatsLink.navigatedTo).toBe('/items/mats');
  });
});
