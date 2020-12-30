import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Directive, Type } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { UnknownState } from 'global-types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynamicHostDirective } from '../dynamic-host.directive';
import { _getControlObserver$ } from '../helpers/get-control-observer.helper';
import { ControlGroupComponent, ControlHook, DynamicControl, DynamicControlGroup, DynamicForm, QuestionComponent, QuestionWrapper } from '../interfaces';

type Control = DynamicControl<UnknownState>;
type ControlGroup = DynamicControlGroup<UnknownState>
export type ValidControl = Control | ControlGroup;

@Directive()
export abstract class ControlComponentLoaderComponent {
    dynamicHost: DynamicHostDirective;

    unsubscribe : Subject<void> = new Subject();

    form: FormGroup;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,  
        private cdRef: ChangeDetectorRef,      
        private defaultControlGroupComponent: Type<ControlGroupComponent>,
    ) { }

    ngOnDestroy(){
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    protected loadComponents(controls: ValidControl[], form: DynamicForm<{},{}>, nestedNames: string[] = []): void{
        for(const control of controls){
            if(control.type === "group")
                this.loadQuestionGroupComponent(control, form, nestedNames)       
            else if(control.questions)
                for(const question of control.questions){
                    const nestedControl = this.form.get([...nestedNames, control.name])
                    if(nestedControl) this.loadQuestionComponent(question, control, nestedControl, form);
                }
        }
    }

    protected onQuestionComponentInit(componentRef: ComponentRef<QuestionComponent>, control: Control): void {}

    private loadQuestionComponent(questionWrapper: QuestionWrapper, control: Control, formControl: AbstractControl, formConfig: DynamicForm<unknown,unknown>) {
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

    private loadQuestionGroupComponent(controlGroup: ControlGroup, formConfig: DynamicForm<{},{}>, nestedNames: string[] = []) {
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