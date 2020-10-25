import { EventEmitter } from '@angular/core';

export interface FormComponent<TConfig, TFormState, TResult> {
    config: TConfig;
    formState: TFormState;
    formSubmitted: EventEmitter<TResult>;
}