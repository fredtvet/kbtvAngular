import { Injectable } from '@angular/core';
import { Maybe } from 'global-types';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { OptionsGetter } from './interfaces';

/** Exposes form state to all components in the dynamic form provider scope. 
 *  Can be used by question components to access neccesary form state. */
@Injectable()
export class DynamicFormStore<TFormState extends {}> {
    
    private formStateSubject = new BehaviorSubject<Maybe<TFormState>>(null);
    /** An observable of the formState */
    formState$ = this.formStateSubject.asObservable();

    get formState(): Maybe<TFormState> {  return this.formStateSubject.value };

    constructor(){ }

    /** Set the form state causing the formState observer to emit */
    setFormState(formState: Maybe<TFormState>): void{ this.formStateSubject.next(formState); }

    /** Get options stored in formState with the provided getter.
     * @param getter
     * @returns An observer of the options returned by the getter. */
    getOptions$<T>(getter: OptionsGetter<T>): Observable<T[]> {
        if(getter && getter instanceof Function)
            return this.formState$.pipe(
                map(x => x ? getter(x) : []), 
                distinctUntilChanged())

        return of(getter as T[] || []);
    }
}