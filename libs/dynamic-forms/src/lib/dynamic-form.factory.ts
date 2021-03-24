import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Immutable, ImmutableArray, Maybe, UnknownState } from "global-types";
import { take } from "rxjs/operators";
import { DynamicFormStore } from "./dynamic-form.store";
import { DisabledControls, DynamicControl, DynamicControlGroup, DynamicForm } from "./interfaces";

type ControlArray = ImmutableArray<DynamicControlGroup<UnknownState> | DynamicControl<UnknownState>>
/** Responsible for creating an angular form group based on a dynamic form interface */
@Injectable()
export class DynamicFormFactory {

    constructor(
        private formBuilder: FormBuilder,
        private formStore: DynamicFormStore<Object>,
    ){}

    create(config: Immutable<DynamicForm<{}, {}>>): FormGroup {
        const form: FormGroup = this.getFormGroup(<ControlArray> config.controls, config.initialValue, config.disabledControls);
        if(config.validators) form.setValidators(<ValidatorFn[]> config.validators)
        return form;
    }

    private getFormGroup(
        controls: ControlArray,
        initialValue: Immutable<unknown>,
        disabledControls: Maybe<DisabledControls<UnknownState>>): FormGroup{
        const formGroup = this.formBuilder.group({});
        for(const control of controls) {
            if(control.type === "group") {
                if(control.name)
                    formGroup.addControl(
                        control.name, 
                        this.getFormGroup(control.controls, initialValue, control.disabledControls)
                    );
                else {
                   const controls = this.getFormGroup(control.controls, initialValue, disabledControls).controls;
                   for(const key in controls)
                        formGroup.addControl(key, controls[key])
                }
            }
            else 
                formGroup.addControl(
                    control.name,  
                    this.getControl(control, initialValue, disabledControls ? disabledControls[control.name] : false)
                )

        }
        return formGroup;
    }

    private getControl(
        control: Immutable<DynamicControl<{}>>, 
        initialValue: Immutable<unknown>, 
        disabled: boolean): AbstractControl {
        const value = 
            control.valueGetter instanceof Function ? control.valueGetter(initialValue || {}) : control.valueGetter;
        
        const validators: ValidatorFn[] = control.validators?.slice() || [];
        if(control.required) validators.push(Validators.required)       
        const asyncValidators: AsyncValidatorFn[] = [];
        if(control.asyncStateValidators) //Validators using state as input
            for(const customValidator of control.asyncStateValidators) 
                asyncValidators.push(customValidator(this.formStore.formState$.pipe(take(1)))) 

        return this.formBuilder.control({value, disabled}, validators, asyncValidators);
    }

}
