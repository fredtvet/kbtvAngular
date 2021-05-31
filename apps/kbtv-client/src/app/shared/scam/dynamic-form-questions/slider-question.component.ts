import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { SharedModule } from '@shared/shared.module';
import { BaseQuestionComponent, DynamicFormStore, Question, ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';

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
        <mat-slider [color]="question.color || 'accent'" [value]="control?.value" 
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
export class SliderQuestionComponent extends BaseQuestionComponent<null, SliderQuestion> {

    constructor(
      @Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap, 
      formStore: DynamicFormStore
    ) { 
        super(validationErrorMessages, formStore) 
    }

    updateValue(val: number){
        if(!this.control) return;
        this.control.setValue(val);
        this.control.markAsDirty();
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