import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { OptionsGetter } from './interfaces';

@Injectable()
export class DynamicFormStore<TFormState extends Object> {
    
    private formStateSubject = new BehaviorSubject<TFormState>(null);
    formState$ = this.formStateSubject.asObservable();

    get formState(): TFormState {  return this.formStateSubject.value };
    constructor(){ }

    setFormState(formState: TFormState): void{ this.formStateSubject.next(formState); }

    getOptions$<T>(getter: OptionsGetter<T>): Observable<T[]> {
        if(getter && getter instanceof Function)
            return this.formState$.pipe(
                map(x => x ? getter(x) : []), 
                distinctUntilChanged())

        return of(getter as T[] || []);
    }
}