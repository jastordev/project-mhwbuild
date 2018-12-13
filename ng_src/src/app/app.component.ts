import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/service/data.service';
import { ModalService } from './shared/service/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  profileOptsVisible: boolean;

  constructor(private modal : ModalService) {  }

  ngOnInit(){
    this.profileOptsVisible = false;
  }

  removeModal(){
    this.modal.destroy();
  }

  openLoginModal() {
    alert("login modal here");
    //this.modal.init();
  }
}
