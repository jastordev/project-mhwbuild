import { Component, OnInit } from '@angular/core';
import { DOMService } from '../../service/dom.service';

enum ToastType {
  ERROR = 0,
  WARNING = 1,
  SUCCESS = 2,
  INFO = 3
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  private compId : number; 
  private toastType : ToastType;
  private toastClass : string;
  private message : string;

  constructor(private domService : DOMService) {}

  ngOnInit() {
    switch(this.toastType){
      case ToastType.ERROR:
        this.toastClass = "error-toast";
        break;
      case ToastType.WARNING:
        this.toastClass = "warn-toast";
        break;
      case ToastType.SUCCESS:
        this.toastClass = "success-toast";
        break;
      case ToastType.INFO:
        this.toastClass = "info-toast";
        break;
      default: 
        this.toastClass = "info-toast";
    }     
  }

  removeToast(){
    this.domService.removeComponent(this.compId);
  }

}
