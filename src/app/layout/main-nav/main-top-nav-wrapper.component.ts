import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, Output, Type, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainNavConfig } from '../interfaces/main-nav-config.interface';
import { TopNavComponent } from '../interfaces/top-nav-component.interface';

@Component({
  selector: 'app-main-top-nav-wrapper',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTopNavWrapperComponent {

    @Input() set config(value: MainNavConfig<any>) {
        this.onConfigChanges(value)
    }

    @Output() toggleDrawer = new EventEmitter();

    private topNavComponentRef: ComponentRef<TopNavComponent<any>>;
    private toggleDrawerSub: Subscription;
    private topNavSub: Subscription;

    private currentTopNavComponent: Type<TopNavComponent<any>>;

    constructor(
        private viewContainerRef: ViewContainerRef, 
        private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    private onConfigChanges(config: MainNavConfig<any>){
        if(!config || !config.topNavComponent) return;

        if(this.currentTopNavComponent?.prototype.constructor !== config.topNavComponent.prototype.constructor) 
            this.initalizeTopNavComponent(config.topNavComponent);

        if(this.topNavComponentRef)
            this.topNavComponentRef.instance.config = config.topNavConfig;     
    }

    private initalizeTopNavComponent(component: Type<TopNavComponent<any>>): void{
        this.currentTopNavComponent = component;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        this.viewContainerRef.clear();
        this.topNavComponentRef = this.viewContainerRef.createComponent<TopNavComponent<any>>(componentFactory);
        this.toggleDrawerSub?.unsubscribe()
        this.toggleDrawerSub = this.topNavComponentRef.instance.toggleDrawer.subscribe(x => this.toggleDrawer.emit());
    }

    ngOnDestroy(){ this.toggleDrawerSub?.unsubscribe(); this.topNavSub?.unsubscribe() }
}
