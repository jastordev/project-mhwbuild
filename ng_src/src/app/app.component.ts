import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/service/data.service';
import { ModalService } from './shared/service/modal.service';
import { ToastService } from './shared/service/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mhwdb';

  constructor(private data: DataService, private modal : ModalService) {  }

  removeModal(){
    this.modal.destroy();
  }
}
