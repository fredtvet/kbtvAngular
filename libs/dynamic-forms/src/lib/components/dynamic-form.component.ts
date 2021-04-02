import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { Immutable, Maybe } from 'global-types';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { DynamicFormFactory } from '../dynamic-form.factory';
import { DynamicFormStore } from '../dynamic-form.store';
import { DynamicHostDirective } from '../dynamic-host.directive';
import { _getValidationErrorMessage } from '../helpers/get-validation-error-message.helper';
import { _hasSameState } from '../helpers/has-same-state.helper';
import { VALIDATION_ERROR_MESSAGES } from '../injection-tokens.const';
import { DynamicForm, FormComponent, ValidationErrorMap } from '../interfaces';
import { ControlComponentLoaderComponent } from './control-component-loader.component';
import { DynamicControlGroupComponent } from './dynamic-control-group.component';

/** Responsible for rendering a dynamic form with a {@link DynamicForm} configuration. */
@Component({
  selector: 'lib-dynamic-form',
  template: `
    <div style="width:100%;text-align:center;margin-top:24px" *ngIf="form === undefined">Laster inn skjema...</div>
    <form [formGroup]="form" fxLayout="column">
        <ng-container *dynamicHost>

        </ng-container>

        <div style="height:20px">
            <mat-error *ngIf="form.dirty && form.invalid && form.errors">
                {{ getValidationErrorMessage() }}
            </mat-error>
        </div>
        
        <lib-form-actions *ngIf="config"
            [submitDisabled]="(!config.allowPristine && form.pristine) || form.invalid" 
            [submitText]="config.submitText || 'Lagre'" 
            [showReset]="config.resettable"    
            [onlineRequired]="config.onlineRequired"
            (reset)="onReset()"
            (submitted)="onSubmit()" 
            (canceled)="onCancel()">
        </lib-form-actions>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DynamicFormStore, DynamicFormFactory],
})
export class DynamicFormComponent extends ControlComponentLoaderComponent 
    implements FormComponent<DynamicForm<{}, {}>, {}, unknown> {
        
    @ViewChild(DynamicHostDirective, {static: true}) dynamicHost: DynamicHostDirective;
    
    private _config: Immutable<DynamicForm<{}, {}>>;
    @Input('config') 
    set config(value: Immutable<DynamicForm<{}, {}>>) {
        this._config = value;
        setTimeout(() => this.initalizeForm()); 
    }  

    get config(): Immutable<DynamicForm<{}, {}>> { return this._config }

    @Input('formState') 
    set formState(value: {}) {
      this.formStore.setFormState(value)
    }

    @Output() formSubmitted = new EventEmitter<unknown>();

    resetEnabled$: Observable<boolean>;

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        cdRef: ChangeDetectorRef,
        @Inject(VALIDATION_ERROR_MESSAGES) private validationErrorMessages: ValidationErrorMap,
        private formStore: DynamicFormStore<Object>,
        private formFactory: DynamicFormFactory,
    ) { 
        super(componentFactoryResolver, cdRef, DynamicControlGroupComponent);     

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

        this.form = this.formFactory.create(this.config)

        if(this._config.resettable)
            this.resetEnabled$ = this.form.valueChanges.pipe(
                debounceTime(50),
                startWith(true),
                map(x => !_hasSameState(this.form.value, this._config.resetState)),
            )

        this.loadComponents(this._config.controls, this._config);
    }

}
