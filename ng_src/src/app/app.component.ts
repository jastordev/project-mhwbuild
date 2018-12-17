import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/service/data.service';
import { ModalService } from './shared/service/modal.service';
import { LoginComponent } from './shared/components/login/login.component';

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
    this.modal.init(LoginComponent, {}, {});
  }
}
