import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Immutable, Maybe } from 'global-types';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { DynamicFormFactory } from '../../dynamic-form.factory';
import { DynamicFormStore } from '../../dynamic-form.store';
import { DynamicHostDirective } from '../../dynamic-host.directive';
import { _getValidationErrorMessage } from '../../helpers/get-validation-error-message.helper';
import { _hasSameState } from '../../helpers/has-same-state.helper';
import { VALIDATION_ERROR_MESSAGES } from '../../injection-tokens.const';
import { DynamicForm, FormComponent, ValidationErrorMap } from '../../interfaces';
import { DynamicAbstractGroupComponent } from '../dynamic-abstract-group.component';
import { DynamicControlGroupComponent } from '../dynamic-control-group.component';

/** Responsible for rendering a dynamic form with a {@link DynamicForm} configuration. */
@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DynamicFormStore, DynamicFormFactory],
})
export class DynamicFormComponent<TForm extends object, TFormState extends object | null>
    extends DynamicAbstractGroupComponent<DynamicForm<TForm, TFormState>> 
    implements FormComponent<DynamicForm<TForm, TFormState>, Partial<TFormState>, Immutable<TForm>> {
        
    @ViewChild(DynamicHostDirective, {static: true}) dynamicHost: DynamicHostDirective;

    @Input('inputState') 
    set inputState(value: Maybe<Immutable<Partial<TFormState>>>) {
      this.formStore.setInputState(value)
    }

    get config(): Immutable<DynamicForm<TForm, TFormState>> { return this._config }
    @Input('config') 
    set config(value: Immutable<DynamicForm<TForm, TFormState>>) {
        this._config = value;
        this.formOptions = value.options || {};
        this.initialValue = <Immutable<Partial<TForm>>> value.initialValue || {};
        this.initalizeForm();
    }

    @Output() formSubmitted = new EventEmitter<Maybe<Immutable<TForm>>>();

    resetEnabled$: Observable<boolean>;

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        cdRef: ChangeDetectorRef,
        formFactory: DynamicFormFactory,
        @Inject(VALIDATION_ERROR_MESSAGES) private validationErrorMessages: ValidationErrorMap,
        private formStore: DynamicFormStore<TFormState>,
    ) { 
        super(componentFactoryResolver, cdRef, DynamicControlGroupComponent, formFactory);     
    }

    onSubmit(){
        let value = this.formOptions.getRawValue ? this.formGroup.getRawValue() : this.formGroup.value;
        if(this.config.onSubmitFormatter)
            value = this.config.onSubmitFormatter(value, this.formStore.formState || {});
            
        this.formGroup.markAsPristine();
        this.formSubmitted.emit(value);
    }

    onCancel(){
        this.formSubmitted.emit(null);
    }

    onReset(){
        this.formGroup.reset(this.config.resetState || {});
        this.formGroup.markAsDirty()
    }
    
    getValidationErrorMessage(): Maybe<string>{
        return _getValidationErrorMessage(this.formGroup.errors, this.validationErrorMessages)
    }

    private initalizeForm(): void {
        this.formGroup = new FormGroup({});  

        if(this.config.resettable)
            this.resetEnabled$ = this.formGroup.valueChanges.pipe(
                debounceTime(50),
                startWith(true),
                map(x => !_hasSameState(this.formGroup.value, this.config.resetState)),
            )

        this.initalize(); 
        this.cdRef.markForCheck();
        this.formStore.initalizeFormState(this.formGroup, <any> this.config.formStateSetters) 
    }
}
