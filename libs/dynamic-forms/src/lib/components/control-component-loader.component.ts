import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Directive, Input, Type } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Immutable, UnknownState } from 'global-types';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DynamicHostDirective } from '../dynamic-host.directive';
import { ControlGroupComponent, DynamicAbstractGroup, DynamicControl, DynamicControlGroup, DynamicForm, QuestionComponent } from '../interfaces';

@Directive()
export abstract class ControlComponentLoaderComponent {
    dynamicHost: DynamicHostDirective;

    unsubscribe : Subject<void> = new Subject();

    form: FormGroup;

    protected _config: Immutable<DynamicForm<any, any>>;
    @Input('config') 
    set config(value: Immutable<DynamicForm<any, any>>) {
        this._config = value;
        this.onConfigSet();
    }  

    get config(): Immutable<DynamicForm<any, any>> { return this._config }

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,  
        protected cdRef: ChangeDetectorRef,      
        private defaultControlGroupComponent: Type<ControlGroupComponent>,
    ) { }

    ngOnDestroy(){
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    protected abstract onConfigSet(): void

    protected loadComponents(
        group: Immutable<DynamicAbstractGroup<any, any>>, 
        nestedNames: string[] = []): void{
        for(const prop in group.controls){
            const control = group.controls[prop];
            if(control.type === "group")
                this.loadQuestionGroupComponent(control, nestedNames, group.hideOnValueChangeMap?.[control.name])       
            else{
                const nestedControl = this.form.get([...nestedNames, control.name])
                if(nestedControl) this.loadQuestionComponent(control, nestedControl, group.hideOnValueChangeMap?.[control.name]);
            }
        }
    }

    protected onQuestionComponentInit(
        componentRef: ComponentRef<QuestionComponent>, 
        control: Immutable<DynamicControl<UnknownState, keyof UnknownState>>
        ): void {}

    private loadQuestionComponent(
        control: Immutable<DynamicControl<UnknownState, keyof UnknownState>>, 
        formControl: AbstractControl,
        hideOnValueChanges?: (val: any) => boolean) {
        if((this.config.noRenderDisabledControls && formControl.disabled) || !control.questionComponent) return;
        
        const componentRef = this.loadComponent(control.questionComponent!);
        componentRef.instance.control = formControl;
        componentRef.instance.form = this.form;
        componentRef.instance.question = control.question || {};  
        componentRef.instance.required = control.required;  
        componentRef.location.nativeElement.style.marginTop = "3vh";
        if(control.panelClass)
            componentRef.location.nativeElement.classList.add(control.panelClass)   
            
        this.onQuestionComponentInit(componentRef, control);

        if(hideOnValueChanges)
            this.initHideObserver(hideOnValueChanges, componentRef.location.nativeElement);
    }

    private loadQuestionGroupComponent(
        controlGroup: Immutable<DynamicControlGroup<any, any, any>>, 
        nestedNames: string[] = [],
        hideOnValueChanges?: (val: any) => boolean) {
        const componentRef = this.loadComponent(controlGroup.controlGroupComponent || this.defaultControlGroupComponent);
        componentRef.instance.controlGroup = controlGroup;
        componentRef.instance.config = this.config;
        componentRef.instance.form = this.form;
        
        if(controlGroup.panelClass) 
            componentRef.location.nativeElement.classList.add(controlGroup.panelClass)

        componentRef.instance.nestedNames = 
            controlGroup.type === "group" ? 
                [...nestedNames, controlGroup.name] : 
                nestedNames;   

        componentRef.instance.loadGroupComponents(); 

        if(hideOnValueChanges)
            this.initHideObserver(hideOnValueChanges, componentRef.location.nativeElement);       
    }

    private loadComponent<TComponent>(component: Type<TComponent>): ComponentRef<TComponent>{
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        const viewContainerRef = this.dynamicHost.viewContainerRef;

        return viewContainerRef.createComponent<TComponent>(componentFactory);
    }

    private initHideObserver(hideOnValueChanges: (val: any) => boolean, htmlElement: HTMLElement): void{   
        const currentDisplayVal = htmlElement.style.display;

        if(hideOnValueChanges(this.form.value)) htmlElement.style.display = "none";
        
        this.form.valueChanges.pipe(
            map(hideOnValueChanges), 
            takeUntil(this.unsubscribe)
        ).subscribe(x => {
            htmlElement.style.display = (x ? "none" : currentDisplayVal);
            this.cdRef.detectChanges();
        })
    }

}