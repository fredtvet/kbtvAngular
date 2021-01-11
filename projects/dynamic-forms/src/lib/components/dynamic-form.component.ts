import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Maybe, UnknownState } from 'global-types';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, take } from 'rxjs/operators';
import { DynamicFormStore } from '../dynamic-form.store';
import { DynamicHostDirective } from '../dynamic-host.directive';
import { _getValidationErrorMessage } from '../helpers/get-validation-error-message.helper';
import { _hasSameState } from '../helpers/has-same-state.helper';
import { DisabledControls, DynamicControl, DynamicForm, FormComponent, ValidationErrorMap } from '../interfaces';
import { VALIDATION_ERROR_MESSAGES } from '../injection-tokens.const';
import { ControlComponentLoaderComponent, ValidControl } from './control-component-loader.component';
import { DynamicControlGroupComponent } from './dynamic-control-group.component';

/** Responsible for rendering a dynamic form with a {@link DynamicForm} configuration. */
@Component({
  selector: 'lib-dynamic-form',
  template: `
    <form [formGroup]="form" fxLayout="column">
        <ng-container *dynamicHost>

        </ng-container>

        <mat-error *ngIf="form.dirty && form.invalid && form.errors">
            {{ getValidationErrorMessage() }}
        </mat-error>

        <lib-form-actions 
            [submitDisabled]="form.pristine || form.invalid || disableOnOffline" 
            [submitText]="disableOnOffline ? 'Ikke på nett' : (config.submitText || 'Lagre')" 
            [showReset]="config.resettable"
            [resetDisabled]="!(resetEnabled$ | async)"
            (reset)="onReset()"
            (submitted)="onSubmit()" 
            (canceled)="onCancel()">
        </lib-form-actions>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DynamicFormStore],
})
export class DynamicFormComponent extends ControlComponentLoaderComponent 
    implements FormComponent<DynamicForm<{}, {}>, {}, unknown> {
        
    @ViewChild(DynamicHostDirective, {static: true}) dynamicHost: DynamicHostDirective;
    
    private _config: DynamicForm<{}, {}>;
    @Input('config') 
    set config(value: DynamicForm<{}, {}>) {
      this._config = value;
      this.initalizeForm();
    }  

    get config(): DynamicForm<{}, {}> { return this._config }

    @Input('formState') 
    set formState(value: {}) {
      this.formStore.setFormState(value)
    }

    @Output() formSubmitted = new EventEmitter<unknown>();

    resetEnabled$: Observable<boolean>;

    get disableOnOffline(): boolean { 
        return this.config.onlineRequired != null && !navigator.onLine 
    }

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        cdRef: ChangeDetectorRef,
        @Inject(VALIDATION_ERROR_MESSAGES) private validationErrorMessages: ValidationErrorMap,
        private formStore: DynamicFormStore<Object>,
        private formBuilder: FormBuilder,
    ) { super(componentFactoryResolver, cdRef, DynamicControlGroupComponent); }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('newPassword')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
  
    return pass === confirmPass ? null : { notSame: true }     
    }

    onSubmit(){
        let value = this._config.getRawValue ? this.form.getRawValue() : this.form.value;
        if(this._config.onSubmitFormatter)
            value = this._config.onSubmitFormatter(value, this.formStore.formState || {});
            
        this.form.markAsPristine();
        this.formSubmitted.emit(value);
    }

    onCancel(){
        this.formSubmitted.emit(null);
    }

    onReset(){
        this.form.reset(this._config.resetState || {});
        this.form.markAsDirty()
    }
    
    getValidationErrorMessage(): Maybe<string>{
        return _getValidationErrorMessage(this.form.errors, this.validationErrorMessages)
    }

    private initalizeForm() {
        this.dynamicHost.viewContainerRef.clear();

        this.form = this.getFormGroup(this._config.controls, this._config.disabledControls); //Add controls first
        
        if(this.config.validators) this.form.setValidators(this.config.validators)

        if(this._config.resettable)
            this.resetEnabled$ = this.form.valueChanges.pipe(
                debounceTime(50),
                startWith(true),
                map(x => !_hasSameState(this.form.value, this._config.resetState)),
            )

        this.loadComponents(this._config.controls, this._config);
    }

    private getFormGroup(controls: ValidControl[], disabledControls: Maybe<DisabledControls<UnknownState>>): FormGroup{
        const formGroup = this.formBuilder.group({});
        for(const control of controls) {
            if(control.type === "group") {
                if(control.name)
                    formGroup.addControl(control.name, this.getFormGroup(control.controls, control.disabledControls));
                else {
                   const controls = this.getFormGroup(control.controls, disabledControls).controls;
                   for(const key in controls)
                       formGroup.addControl(key, controls[key]);           
                }
            }
            else
                formGroup.addControl(
                    control.name, 
                    this.getControl(control, disabledControls ? disabledControls[control.name] : false)
                );
        }
        return formGroup;
    }

    private getControl(control: DynamicControl<{}>, disabled: boolean): AbstractControl {
        const value = 
            control.valueGetter instanceof Function ? control.valueGetter(this._config.initialValue || {}) : control.valueGetter;
  
        const validators: ValidatorFn[] = control.validators || [];
        if(control.required) validators.push(Validators.required)

        const asyncValidators: AsyncValidatorFn[] = [];
        if(control.asyncStateValidators) //Validators using state as input
            for(const customValidator of control.asyncStateValidators) 
                asyncValidators.push(customValidator(this.formStore.formState$.pipe(take(1)))) 

        return this.formBuilder.control({value, disabled}, validators, asyncValidators);
    }

}
