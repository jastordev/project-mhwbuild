import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { DataService } from '../shared/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {       
  }

  getItemCount() : Observable<number>{
    return this.data.getItemCount();
  }

  getWepCount() : Observable<number>{
    return this.data.getWepCount();
  }

  getArmCount() : Observable<number>{
    return this.data.getArmCount();
  }

  getSkillCount() : Observable<number>{
    return this.data.getSkillCount();
  }

  getBuildCount() : Observable<number>{
    return this.data.getBuildCount();
  }

}
