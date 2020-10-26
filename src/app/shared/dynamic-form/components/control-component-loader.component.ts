import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { WithUnsubscribe } from 'src/app/shared-app/mixins/with-unsubscribe.mixin';
import { DynamicHostDirective } from 'src/app/shared/directives';
import { _getControlObserver$ } from '../helpers/get-control-observer.helper';
import { ControlGroupComponent, ControlHook, DynamicControl, DynamicControlGroup, DynamicForm, QuestionComponent, QuestionWrapper } from '../interfaces';

export type ValidControl = DynamicControlGroup<any> | DynamicControl<any>;

export abstract class ControlComponentLoaderComponent extends WithUnsubscribe() {
    dynamicHost: DynamicHostDirective;

    form: FormGroup;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,  
        private cdRef: ChangeDetectorRef,      
        private defaultControlGroupComponent: Type<ControlGroupComponent>,
    ) { super() }

    protected loadComponents(controls: ValidControl[], form: DynamicForm<any,any>, nestedNames: string[] = []): void{
        for(const control of controls){
            if(control.type === "group")
                this.loadQuestionGroupComponent(control, form, nestedNames)       
            else if(control.questions)
                for(const question of control.questions)
                    this.loadQuestionComponent(question, control, this.form.get([...nestedNames, control.name]), form);
        }
    }

    protected onQuestionComponentInit(componentRef: ComponentRef<QuestionComponent>, control: DynamicControl<any>): void {}

    private loadQuestionComponent(questionWrapper: QuestionWrapper, control: DynamicControl<any>, formControl: AbstractControl, formConfig: DynamicForm<any,any>) {
        if(formConfig.noRenderDisabledControls && formControl.disabled) return;
        
        const componentRef = this.loadComponent(questionWrapper.component);
        componentRef.instance.control = formControl;
        componentRef.instance.form = this.form;
        componentRef.instance.question = questionWrapper.question;  
        componentRef.instance.required = control.required;  
        componentRef.location.nativeElement.style.marginBottom = "8px";

        this.onQuestionComponentInit(componentRef, control);

        if(questionWrapper.hideOnValueChange)
            this.initHideObserver(questionWrapper.hideOnValueChange, componentRef.location.nativeElement);
    }

    private loadQuestionGroupComponent(controlGroup: DynamicControlGroup<any>, formConfig: DynamicForm<any,any>, nestedNames: string[] = []) {
        const componentRef = this.loadComponent(controlGroup.controlGroupComponent || this.defaultControlGroupComponent);
        componentRef.instance.controlGroup = controlGroup;
        componentRef.instance.formConfig = formConfig;
        componentRef.instance.form = this.form;
        componentRef.instance.nestedNames = controlGroup.name ? [...nestedNames, controlGroup.name] : nestedNames;
    }

    private loadComponent<TComponent>(component: Type<TComponent>): ComponentRef<TComponent>{
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        const viewContainerRef = this.dynamicHost.viewContainerRef;

        return viewContainerRef.createComponent<TComponent>(componentFactory);
    }

    private initHideObserver(hook: ControlHook<boolean>, htmlElement: HTMLElement): void{   
        const currentDisplayVal = htmlElement.style.display;

        if(hook.callback(this.form.get(hook.controlName)?.value)) 
            htmlElement.style.display = "none";

        _getControlObserver$(hook, this.form, true).pipe(takeUntil(this.unsubscribe)).subscribe(x => {
            htmlElement.style.display = (x ? "none" : currentDisplayVal);
            this.cdRef.markForCheck();
        })
    }

}