import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Immutable, Maybe, UnknownState } from "global-types";
import { take } from "rxjs/operators";
import { DynamicFormStore } from "./dynamic-form.store";
import { DisabledControls, DynamicControl, DynamicForm, ValidControlObject } from "./interfaces";

/** Responsible for creating an angular form group based on a dynamic form interface */
@Injectable()
export class DynamicFormFactory {

    constructor(
        private formBuilder: FormBuilder,
        private formStore: DynamicFormStore<Object>,
    ){}

    create(config: Immutable<DynamicForm<any, any>>): FormGroup {
        const form: FormGroup = this.getFormGroup(config.controls, config.initialValue, config.disabledControls, config.disableControlsWithValue);
        if(config.validators) form.setValidators(<ValidatorFn[]> config.validators)
        return form;
    }

    private getFormGroup(
        controls: Immutable<ValidControlObject<any, any>>,
        initialValue: Maybe<Immutable<UnknownState>>,
        disabledControls: Maybe<DisabledControls<any>>,
        disableControlsWithValue?: boolean): FormGroup{
        const formGroup = this.formBuilder.group({});
        for(const prop in controls) {
            const control = controls[prop];
            if(control.type === "group") {        
                formGroup.addControl(
                    control.name, 
                    this.getFormGroup(
                        control.controls, 
                        <UnknownState> initialValue?.[control.name], 
                        control.disabledControls, 
                        disableControlsWithValue
                    )
                );
            }
            else 
                formGroup.addControl(
                    control.name,  
                    this.getControl(
                        control, 
                        <UnknownState> initialValue?.[control.name], 
                        disabledControls ? disabledControls[control.name] : false,
                        disableControlsWithValue
                    )
                )

        }
        return formGroup;
    }

    private getControl(
        control: Immutable<DynamicControl<any, any, any>>, 
        initialValue: Maybe<Immutable<UnknownState>>, 
        disabled: boolean,
        disableControlsWithValue?: boolean): AbstractControl {
        const value = control.valueFormatter ? control.valueFormatter(initialValue) : initialValue;
            
        const validators: ValidatorFn[] = control.validators?.slice() || [];
        if(control.required) validators.push(Validators.required)       
        const asyncValidators: AsyncValidatorFn[] = [];
        if(control.asyncStateValidators) //Validators using state as input
            for(const customValidator of control.asyncStateValidators) 
                asyncValidators.push(customValidator(this.formStore.formState$.pipe(take(1)))) 

        if(value && disableControlsWithValue) disabled = true;

        return this.formBuilder.control({value, disabled}, validators, asyncValidators);
    }

}
