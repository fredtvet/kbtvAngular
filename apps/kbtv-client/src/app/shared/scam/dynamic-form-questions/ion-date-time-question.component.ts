import { ChangeDetectionStrategy, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/shared.module';
import { BaseQuestionComponent, ControlHook, Question, ValidationErrorMap, VALIDATION_ERROR_MESSAGES, _getControlObserver$ } from 'dynamic-forms';
import { Immutable, Maybe } from 'global-types';
import { Observable, of, throwError } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';

export interface IonDateQuestion<TForm> extends Question {
    ionFormat: string;
    datePipeFormat?: string;
    minuteValues?: number[];
    defaultValueGetter?: ((form: Maybe<Immutable<TForm>>) => string) | string;
    min?: string | ControlHook<string>;
    max?: string | ControlHook<string>;
    valueSetter?: (value: unknown) => unknown;
}

const _dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag","Torsdag", "Fredag", "Lørdag"]
const _dayShortNames = ["Søn", "Man", "Tir", "Ons","Tor", "Fre", "Lør"]
const _monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
const _monthShortNames = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"]

@Component({
  selector: 'app-ion-date-question',
  template:`
   <div (tap)="dateTime.click()" class="w-100" [ngStyle]="{'pointer-events': control?.disabled ? 'none' : 'auto'}">
     
      <mat-form-field style="pointer-events:none!important;" class="w-100" [color]="question.color || 'accent'">
        <mat-label *ngIf="question.label">{{ question.label }}</mat-label>
        <input matInput required 
          [disabled]="control?.disabled" 
          [value]="question.datePipeFormat ? ((value$ | async) | date : question.datePipeFormat) : (value$ | async)" 
          [placeholder]="question.placeholder" 
          [attr.aria-label]="question.ariaLabel">  
            <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>

            <mat-error *ngIf="control && control.dirty && control.invalid">
              {{ getValidationErrorMessage() }}
            </mat-error>  
      </mat-form-field>

      <ion-datetime #dateTime appHide 
        cancel-text="Avbryt" done-text="Ferdig"
        [attr.max]="max$ | async"
        [attr.min]="min$ | async"
        [attr.day-names]="dayNames"
        [attr.day-short-names]="dayShortNames"
        [attr.month-names]="monthNames"
        [attr.month-short-names]="monthShortNames"
        [attr.display-format]="question.ionFormat"
        [attr.minute-values]="question.minuteValues"
        [value]="control?.value || (question.defaultValueGetter | func : form.value) || question.defaultValueGetter"
        (ionChange)="onChange($event.detail.value);">
      </ion-datetime>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonDateQuestionComponent extends BaseQuestionComponent<IonDateQuestion<unknown>> {

  dayNames = _dayNames;
  dayShortNames = _dayShortNames;
  monthNames = _monthNames;
  monthShortNames = _monthShortNames;

  min$: Observable<string>;
  max$: Observable<string>;

  value$: Observable<string>;

  constructor(@Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap, private cdRef: ChangeDetectorRef) { 
    super(validationErrorMessages) 
  }

  onChange(val: unknown){
    if(!this.control) return;

    const value = this.question.valueSetter ? this.question.valueSetter(val) : val;

    this.control.setValue(value);  
    this.control.markAsDirty();
    this.cdRef.markForCheck();
  }

  protected onQuestionChanges(question: IonDateQuestion<unknown>): void { 
    super.onQuestionChanges(question);
    if(this.control)
      this.value$ = this.control.valueChanges.pipe(startWith(this.control.value));
    this.min$ = this.setMinMax(question, "min");
    this.max$ = this.setMinMax(question, "max");
  }

  private setMinMax(question: IonDateQuestion<unknown>, type: "min" | "max"): Observable<string>{
    if(!question) return throwError("No question provided");
  
    let observer = of(question[type] as string);
    if(typeof question[type] === "object") 
      observer = _getControlObserver$(question[type] as ControlHook<string>, this.form);   

    return observer.pipe(filter(x => x != null));   
  }

}

@NgModule({
  declarations: [IonDateQuestionComponent],
  imports:[
    SharedModule,
    MatFormFieldModule,
    MatInputModule,   
     
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
class IonDateQuestionModule {}