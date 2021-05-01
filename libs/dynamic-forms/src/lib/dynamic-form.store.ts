import { Injectable } from '@angular/core';
import { Immutable, ImmutableArray, Maybe } from 'global-types';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { OptionsGetter } from './interfaces';

/** Exposes form state to all components in the dynamic form provider scope. 
 *  Can be used by question components to access neccesary form state. */
@Injectable()
export class DynamicFormStore<TFormState extends {}> {
    
    private formStateSubject = new BehaviorSubject<Immutable<Maybe<TFormState>>>(null);
    /** An observable of the formState */
    formState$: Observable<Immutable<Maybe<TFormState>>> = 
        this.formStateSubject.asObservable();

    get formState(): Immutable<Maybe<TFormState>> {  
        return this.formStateSubject.value 
    };

    /** Set the form state causing the formState observer to emit */
    setFormState(formState: Immutable<Maybe<TFormState>>): void{ 
        this.formStateSubject.next(formState); 
    }

    /** Get options stored in formState with the provided getter.
     * @param getter
     * @returns An observer of the options returned by the getter. */
    getOptions$<T>(getter: Immutable<OptionsGetter<T, Partial<TFormState>>>): Observable<ImmutableArray<T>> {
        if(getter && getter instanceof Function)
            return this.formState$.pipe(
                map(x => x ? (getter(x) || []) : []), 
                distinctUntilChanged())

        return of(getter || []);
    }
}