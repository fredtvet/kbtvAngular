import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { SharedModule } from '@shared/shared.module';
import { BaseQuestionComponent, Question, QuestionComponent, ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

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
    <style>
      .slider-container{
        display: flex;
        align-items: center;
      }
      mat-slider{
        flex: 1 1 0%;
        box-sizing: border-box;
      }
    </style>

    <div class="mat-body" *ngIf="question.label">{{ question.label }}</div>

    <mat-hint *ngIf="question.hint" class="mat-caption">{{ question.hint }}</mat-hint>
    
    <div class="slider-container">
        <span class="mat-body">{{ (control?.value || '') + " " + (question?.valueSuffix || '') }}</span>
        <mat-slider [color]="question.color || 'accent'" [value]="value$ | async" 
            (input)="updateValue($event.value)"
            [thumbLabel]="question.thumbLabel"
            [tickInterval]="question.tickInterval || 1"
            [min]="question.min"
            [max]="question.max">
        </mat-slider>
    </div>

    <mat-error *ngIf="control && control.dirty && control.invalid">
      {{ getValidationErrorMessage() }}
    </mat-error>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderQuestionComponent extends BaseQuestionComponent<SliderQuestion> 
    implements QuestionComponent {

    value$: Observable<unknown>;

    constructor(@Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap) { 
        super(validationErrorMessages) 
    }

    updateValue(val: number){
        if(!this.control) return;
        this.control.setValue(val);
        this.control.markAsDirty();
    }

    protected onQuestionChanges(question: SliderQuestion): void { 
        super.onQuestionChanges(question);
        if(this.control)
          this.value$ = this.control.valueChanges.pipe(startWith(this.control.value));
    }

}

@NgModule({
  declarations: [SliderQuestionComponent],
  imports:[
    SharedModule,   
    MatFormFieldModule,
    MatSliderModule
  ]
})
class SliderQuestionModule {}