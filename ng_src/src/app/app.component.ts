import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mhwdb';

  constructor(private data: DataService) {  }

  ngOnInit(){

  }
}
