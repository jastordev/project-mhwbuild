import { Injectable } from '@angular/core';
import { DOMService } from './dom.service';

/*
* Service which helps placing/enabling a modal. The code comes from this article.
* https://itnext.io/angular-create-your-own-modal-boxes-20bb663084a1
* Which im basing this modal implementation on. 
*/

@Injectable()
export class ModalService {

  // Maybe change this to be more flexible?
  private modalId = "modal-container";
  private overlayId = "overlay";
  private modalCompId : number;
  
  constructor( private domService : DOMService) { }

  init(component : any, inputs: object, outputs: object){
    let compConfig = {
      inputs:inputs,
      outputs:outputs
    }
    this.modalCompId = 
      this.domService.appendComponentTo(this.modalId, component, compConfig);
    document.body.classList.add("noscroll");
    document.getElementById(this.modalId).className = "show";
    document.getElementById(this.overlayId).className = "show";
  }

  destroy(){
    let canDestroy = this.domService.canCloseModal(this.modalCompId);
        
    if(!canDestroy) {
      confirm("If you navigate away, you will discard all changes."
       + " Continue anyway?") ? canDestroy = true : canDestroy = false; 
    }
    
    if(canDestroy){

      document.getElementById(this.modalId).classList.add("fade-out");
      document.getElementById(this.overlayId).classList.add("fade-out");

      // Delay value tied with the transition property of both modal and overlay ids
      setTimeout(() => {
        document.getElementById(this.modalId).className = "hidden";
        document.getElementById(this.overlayId).className = "hidden";
        document.body.classList.remove("noscroll");
        this.domService.removeComponent(this.modalCompId);
      } , 100);

    }    
  }
}
