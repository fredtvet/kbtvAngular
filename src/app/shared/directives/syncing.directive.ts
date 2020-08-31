import { ComponentFactoryResolver, ComponentRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SyncingOverlayComponent } from '../components';

@Directive({
  selector: '[appSyncing]'
})
export class SyncingDirective{

  private overlayContainer: ComponentRef<SyncingOverlayComponent>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @Input()
  set appSyncing(syncing: boolean) {   
    if(syncing)  this.createOverlay()
    else this.createRegular();    
  }

  private createRegular(){
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.templateRef);    
  }

  private createOverlay(){
    this.viewContainerRef.clear()
    const containerFactory = this.componentFactoryResolver.resolveComponentFactory(SyncingOverlayComponent);
    this.overlayContainer = this.viewContainerRef.createComponent(containerFactory);
    this.overlayContainer.instance.template = this.templateRef;
  }

}