import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { Item } from '../shared/models/item.model';

import { DataService } from '../shared/service/data.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items : Item[];

  constructor(private data : DataService) { }

  ngOnInit() {
    this.data.items.subscribe( data => {
      this.items = data;
    });
  }

}
