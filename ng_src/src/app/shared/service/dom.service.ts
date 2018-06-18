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

  private childComponentRef : any;

  constructor(
    private componentFactoryResolver : ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public appendComponentTo(parentId : string, child : any, childConfig? : childConfig) {
    
    const childComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(child).create(this.injector);

    this.attachConfig(childConfig, childComponentRef);

    this.childComponentRef = childComponentRef;
    this.appRef.attachView(childComponentRef.hostView);

    const childDOMElem = (childComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.classList.add("noscroll");
    document.getElementById(parentId).appendChild(childDOMElem);

  }

  public removeComponent(){
    document.body.classList.remove("noscroll");
    this.appRef.detachView(this.childComponentRef.hostView);
    this.childComponentRef.destroy();
  }

  private attachConfig(config, componentRef){
    let inputs = config.inputs;
    let outputs = config.outputs;

    for (var key in inputs){
      componentRef.instance[key] = inputs[key];
    }

    for (var key in outputs) {
      componentRef.instance[key] = outputs[key];
    }

  }
}
