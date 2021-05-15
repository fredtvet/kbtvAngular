import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeepPropsObject, Immutable, Maybe, UnknownState } from 'global-types';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { _formControlsChanges$ } from './helpers/select-form-controls.helper';
import { GenericFormStateSetter } from './interfaces';
import { selectState } from './select-state.operator';
import { _isFormStateSetter } from './type.helpers';

/** Exposes form state to all components in the dynamic form provider scope. 
 *  Can be used by question components to access neccesary form state. */
@Injectable()
export class DynamicFormStore<TFormState extends object | null = null> {
    
    private inputStateSubject = new BehaviorSubject<Immutable<Maybe<Partial<TFormState>>>>(null);

    private formStateSubject = new BehaviorSubject<Immutable<Partial<TFormState>>>(<Immutable<TFormState>> {})

    /** An observable of the formState */
    formState$: Observable<Immutable<Maybe<Partial<TFormState>>>> = 
        this.formStateSubject.asObservable();

    get formState(): Immutable<Partial<TFormState>> {  
        return this.formStateSubject.value 
    };

    private formStateSub: Subscription;

    /** Set the input state causing the formState observer to emit */
    setInputState(inputState: Immutable<Maybe<Partial<TFormState>>>): void{ 
        this.inputStateSubject.next(inputState);      
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
        const observers: Observable<Immutable<Partial<TFormState>>>[] = 
            [<Observable<Immutable<Partial<TFormState>>>> this.inputStateSubject.asObservable()];

        if(formStateSetters)
            for(const setter of formStateSetters){
                if(_isFormStateSetter(setter)){
                    const observer =  combineLatest([
                        !setter.formSlice ? of(undefined) : 
                            _formControlsChanges$(form, setter.formSlice),
                        !setter.stateSlice ? of(undefined) : 
                            this.inputStateSubject.asObservable().pipe(<any>selectState<UnknownState>(setter.stateSlice)),
                    ]).pipe(map(x => <Immutable<Partial<TFormState>>> 
                        setter.setter(<DeepPropsObject<object | null, string>> x[0], <DeepPropsObject<object | null, string>> x[1]))
                    );
                    if(setter.keepActive === false) observers.push(observer.pipe(take(1)));
                    else observers.push(observer);    
                } 
                else observers.push(of(<Immutable<Partial<TFormState>>> setter))
            }
        
        return merge(...observers).pipe(map(setState => { 
            return {...this.formStateSubject.value, ...setState}
        }));
    }

}