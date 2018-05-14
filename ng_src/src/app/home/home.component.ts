import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tableCounts : any;

  constructor(private home: HomeService) { }

  ngOnInit() {
    this.getOverview();
  }

  getOverview(){
    this.home.getOverview().subscribe(tblCounts => {
      this.tableCounts = tblCounts;
    });
  }

}
