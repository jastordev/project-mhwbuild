import { Component, OnInit } from '@angular/core';
import { trigger, state, style, 
  animate, transition, keyframes} from '@angular/animations';
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
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger("toastAnim", [
      transition("void => *", [
        animate(200, keyframes([
          style({opacity: 0, transform: "scale(0)", offset: 0 }),
          style({opacity: 1, transform: "scale(1.2)", offset: 0.5}),
          style({opacity: 1, transform: "scale(1)", offset: 1}),
        ]))
      ]),
      transition("* => void", [
        animate(300, keyframes([
          style({opacity: 1, transform: "scale(1)", offset: 0 }),
          style({opacity: 1, transform: "scale(1.2)", offset: 0.5}),
          style({opacity: 0, transform: "scale(0)", offset: 1}),
        ]))
      ])
    ])
  ],
  host: {'[@toastAnim]': 'true' }
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
