import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/service/data.service';
import { ModalService } from './shared/service/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mhwdb';

  constructor(private data: DataService, private modal : ModalService) {  }

  ngOnInit(){

  }

  removeModal(){
    this.modal.destroy();
  }
}
