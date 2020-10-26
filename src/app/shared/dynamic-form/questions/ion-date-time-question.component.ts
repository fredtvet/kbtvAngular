import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import { _getControlObserver$ } from '../helpers/get-control-observer.helper';
import { ControlHook, Question } from '../interfaces';
import { ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from '../validation-error-map.interface';
import { BaseQuestionComponent } from './base-question.component';

export interface IonDateQuestion extends Question {
    ionFormat: string;
    datePipeFormat: string;
    minuteValues?: number[];
    defaultValueGetter?: ((form: any) => string) | string;
    min: string | ControlHook<string>;
    max: string | ControlHook<string>;
    valueSetter: (value: any) => any;
    overrideValueSetterControl?: string;
}

@Component({
  selector: 'app-ion-date-question',
  template:`
   <div (click)="dateTime.click()" class="w-100" [ngStyle]="{'pointer-events': control.disabled ? 'none' : 'auto'}">
     
      <mat-form-field style="pointer-events:none!important;" class="w-100" [color]="question.color || 'accent'">
        <mat-label *ngIf="question.label">{{ question.label }}</mat-label>
        <input matInput required 
          [disabled]="control.disabled" 
          [value]="(value$ | async) | date : question.datePipeFormat || question.ionFormat" 
          [placeholder]="question.placeholder" 
          [attr.aria-label]="question.ariaLabel">  
            <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>

            <mat-error *ngIf="control.dirty && control.invalid">
              {{ getValidationErrorMessage() }}
            </mat-error>  
      </mat-form-field>

      <ion-datetime #dateTime fxHide 
        cancel-text="Avbryt" done-text="Ferdig"
        [attr.max]="max$ | async"
        [attr.min]="min$ | async"
        [attr.day-names]="dayNames"
        [attr.day-short-names]="dayShortNames"
        [attr.month-names]="monthNames"
        [attr.month-short-names]="monthShortNames"
        [attr.display-format]="question.ionFormat"
        [attr.minute-values]="question.minuteValues"
        [value]="control.value || (question.defaultValueGetter | func : form.value) || question.defaultValueGetter"
        (ionChange)="onChange($event.detail.value);">
      </ion-datetime>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonDateQuestionComponent extends BaseQuestionComponent<IonDateQuestion> {

  dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag","Torsdag", "Fredag", "Lørdag"]
  dayShortNames = ["Søn", "Man", "Tir", "Ons","Tor", "Fre", "Lør"]
  monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
  monthShortNames = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"]

  min$: Observable<string>;
  max$: Observable<string>;

  value$: Observable<string>;

  constructor(@Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap) { 
    super(validationErrorMessages) 
  }

  onChange(val: any){
    const value = this.question.valueSetter ? this.question.valueSetter(val) : val;
    let control = this.control;

    if(this.question.overrideValueSetterControl) 
      control = this.form.get(this.question.overrideValueSetterControl)

    control.setValue(value);  
    control.markAsDirty();
  }

  protected onQuestionChanges(question: IonDateQuestion): void { 
    super.onQuestionChanges(question);
    this.value$ = this.control.valueChanges.pipe(startWith(this.control.value));
    this.min$ = this.setMinMax(question, "min");
    this.max$ = this.setMinMax(question, "max");
  }

  private setMinMax(question: IonDateQuestion, type: "min" | "max"): Observable<string>{
    if(!question) return;
  
    let observer = of(question[type] as string);
    if(typeof question[type] === "object") 
      observer = _getControlObserver$(question[type] as ControlHook<string>, this.form);   

    return observer.pipe(filter(x => x != null));   
  }

}