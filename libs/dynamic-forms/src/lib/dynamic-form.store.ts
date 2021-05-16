import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeepPropsObject, Immutable, Maybe, UnknownState } from 'global-types';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { _formControlsChanges$ } from './helpers/select-form-controls.helper';
import { GenericFormStateSetter } from './interfaces';
import { selectState } from './select-state.operator';
import { _isFormStateSetter } from './type.helpers';

/** Exposes form state to all components in the dynamic form provider scope. 
 *  Can be used by question components to access neccesary form state. */
@Injectable()
export class DynamicFormStore<TFormState extends object | null = null> {
    
    private formStateSubject = new BehaviorSubject<Immutable<Partial<TFormState>>>(<Immutable<TFormState>> {})

    /** An observable of the formState */
    formState$: Observable<Immutable<Maybe<Partial<TFormState>>>> = 
        this.formStateSubject.asObservable();

    get formState(): Immutable<Partial<TFormState>> {  
        return this.formStateSubject.value 
    };

    private formStateSub: Subscription;

    constructor(){ }

    /** Set the input state causing the formState observer to emit */
    setInputState(inputState: Immutable<Partial<TFormState>>): void{ 
        this.formStateSubject.next(inputState);      
    }

    /** Set the form state setters causing the formState observer to emit */
    initalizeFormState(form: FormGroup, formStateSetters: Maybe<Immutable<GenericFormStateSetter[]>>): void { 
        this.formStateSub?.unsubscribe();
        this.formStateSub = this.getFormStateObserver$(form, formStateSetters).subscribe(x => this.formStateSubject.next(x));
    }

    ngOnDestroy(): void {
        this.formStateSub?.unsubscribe();
    }

    private getFormStateObserver$(form: FormGroup, formStateSetters: Maybe<Immutable<GenericFormStateSetter[]>>): Observable<Immutable<Partial<TFormState>>> {
        const observers: Observable<Immutable<Partial<TFormState>>>[] = [];

        if(formStateSetters)
            for(const setter of formStateSetters){
                observers.push(this.createSetterObserver$(form, setter))
            }
       
        return merge(...observers).pipe(
            catchError(x => { console.error(x); return throwError(x)}),
            map(setState => { 
            return {...this.formStateSubject.value, ...setState}
            })
        );
    }

    private createSetterObserver$(
        form: FormGroup, 
        setter: Immutable<GenericFormStateSetter>): Observable<Immutable<Partial<TFormState>>> {
        if(_isFormStateSetter(setter)){
            
            const formObserver = setter.formSlice.length === 0 ? of(undefined) :  
                _formControlsChanges$(form, setter.formSlice);

            const stateObserver = setter.stateSlice.length === 0 ? of(undefined) : 
                this.formState$.pipe(<any>selectState<UnknownState>(setter.stateSlice));

            const observer =  combineLatest([formObserver, stateObserver]).pipe(
                map(x => <Immutable<Partial<TFormState>>> 
                    setter.setter(<DeepPropsObject<object | null, string>> x[0], <DeepPropsObject<object | null, string>> x[1])
                )
            );

            if(setter.keepActive === false) return observer.pipe(take(1));
            else return observer;    
        } 
        else return of(<Immutable<Partial<TFormState>>> setter)
    }

}