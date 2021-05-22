import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { Immutable } from "global-types";
import { take } from "rxjs/operators";
import { DynamicFormStore } from "./dynamic-form.store";
import { DynamicControl } from "./interfaces";

/** Responsible for creating an angular form group based on a dynamic form interface */
@Injectable()
export class DynamicFormFactory {

    constructor(
        private formBuilder: FormBuilder,
        private formStore: DynamicFormStore<object>,
    ){}

    createControl(
        control: Immutable<DynamicControl<unknown, object>>,  
        disabled: boolean,
    ): AbstractControl {

        const validators: ValidatorFn[] = control.validators?.slice() || [];
        if(control.required) validators.push(Validators.required)       
        const asyncValidators: AsyncValidatorFn[] = [];

        if(control.asyncStateValidators) //Validators using state as input
            for(const customValidator of control.asyncStateValidators) 
                asyncValidators.push(customValidator(this.formStore.formState$.pipe(take(1)))) 

        return this.formBuilder.control({value: null, disabled}, validators, asyncValidators);
    }

}
