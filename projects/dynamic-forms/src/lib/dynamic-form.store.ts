import { Injectable } from '@angular/core';
import { Maybe } from 'global-types';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { OptionsGetter } from './interfaces';

@Injectable()
export class DynamicFormStore<TFormState extends {}> {
    
    private formStateSubject = new BehaviorSubject<Maybe<TFormState>>(null);
    formState$ = this.formStateSubject.asObservable();

    get formState(): Maybe<TFormState> {  return this.formStateSubject.value };

    constructor(){ }

    setFormState(formState: Maybe<TFormState>): void{ this.formStateSubject.next(formState); }

    getOptions$<T>(getter: OptionsGetter<T>): Observable<T[]> {
        if(getter && getter instanceof Function)
            return this.formState$.pipe(
                map(x => x ? getter(x) : []), 
                distinctUntilChanged())

        return of(getter as T[] || []);
    }
}