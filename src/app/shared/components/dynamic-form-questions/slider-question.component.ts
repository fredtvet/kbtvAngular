import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Question, QuestionComponent } from '@dynamic-forms/interfaces';
import { VALIDATION_ERROR_MESSAGES, ValidationErrorMap } from '@dynamic-forms/validation-error-map.interface';
import { BaseQuestionComponent } from '@dynamic-forms/components/base-question.component';

export interface SliderQuestion extends Question {
  tickInterval?: number;
  min?: number;
  max?: number;
  thumbLabel?: boolean;
  valueSuffix?: string;
}

@Component({
  selector: 'app-slider-question',
  template: `  
    <div class="mat-body" *ngIf="question.label">{{ question.label }}</div>

    <span *ngIf="question.hint" class="mat-caption">{{ question.hint }}</span>
    
    <div fxLayout="row" fxLayoutAlign="start center">
        <span class="mat-body">{{ control.value + " " + question.valueSuffix }}</span>
        <mat-slider [color]="question.color || 'accent'" fxFlex [value]="value$ | async" 
            (input)="updateValue($event.value)"
            [thumbLabel]="question.thumbLabel"
            [tickInterval]="question.tickInterval || 1"
            [min]="question.min"
            [max]="question.max">
        </mat-slider>
    </div>

    <mat-error *ngIf="control.dirty && control.invalid">
      {{ getValidationErrorMessage() }}
    </mat-error>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderQuestionComponent extends BaseQuestionComponent<SliderQuestion> 
    implements QuestionComponent {

    value$: Observable<any>;

    constructor(@Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap) { 
        super(validationErrorMessages) 
    }

    updateValue(val: number){
        this.control.setValue(val);
        this.control.markAsDirty();
    }

    protected onQuestionChanges(question: SliderQuestion): void { 
        super.onQuestionChanges(question);
        this.value$ = this.control.valueChanges.pipe(startWith(this.control.value));
    }

}
