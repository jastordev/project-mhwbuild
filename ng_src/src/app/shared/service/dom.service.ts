import { 
  Injectable,
  Injector,
  ComponentFactoryResolver,
  ApplicationRef,
  EmbeddedViewRef
} from '@angular/core';

/*
* Service which helps in modifying the DOM. The code comes from this article.
* https://itnext.io/angular-create-your-own-modal-boxes-20bb663084a1
* Which im basing this modal implementation on. 
*/

export interface childConfig {
  inputs : any,
  outputs : any
}

@Injectable()
export class DOMService {

  private childCompRefs : {[id : number]: any};
  private idCounter : number;

  constructor(
    private componentFactoryResolver : ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    this.childCompRefs = {};
    this.idCounter = 1;
  }

  public appendComponentTo(parentId : string, child : any, childConfig? : childConfig) : number{
    
    let compId = this.idCounter;
    this.idCounter++;

    const childComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(child).create(this.injector);

    this.attachConfig(childConfig, childComponentRef, compId);
    this.childCompRefs[compId] = childComponentRef;

    this.appRef.attachView(childComponentRef.hostView);
    
    const childDOMElem = (childComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.getElementById(parentId).appendChild(childDOMElem);

    return compId;

  }

  public removeComponent(id : number){
    if(this.childCompRefs[id]) {            
      this.appRef.detachView(this.childCompRefs[id].hostView);
      this.childCompRefs[id].destroy();
      delete this.childCompRefs[id];
    }
  }

  public isComponentDirty(id: number) : boolean {
    return this.childCompRefs[id].instance.isModalDirty();
  }

  // Helper function
  private attachConfig(config : childConfig, componentRef, id : number){
    let inputs = config.inputs;
    inputs.compId = id;
    let outputs = config.outputs;

    for (var key in inputs){
      componentRef.instance[key] = inputs[key];
    }

    for (var key in outputs) {
      componentRef.instance[key] = outputs[key];
    }

  }
}
