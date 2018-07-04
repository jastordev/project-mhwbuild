import { Component, OnInit } from '@angular/core';
import { DOMService } from '../../service/dom.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  private compId : number; 

  constructor(private domService : DOMService) {}

  ngOnInit() {     
  }

  removeToast(){
    this.domService.removeComponent(this.compId);
  }

}
