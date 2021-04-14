import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LazySelectOption, _shouldEagerOptions } from '@shared-app/helpers/should-eager-options.helper';
import { SharedModule } from '@shared/shared.module';
import { BaseQuestionComponent, DynamicFormStore, OptionsGetter, Question, QuestionComponent, ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { ImmutableArray, Maybe, Prop, UnknownState } from 'global-types';
import { Observable } from 'rxjs';

export interface SelectQuestion<T> extends Question {
  optionsGetter: OptionsGetter<T>;
  lazyOptions?: LazySelectOption;
  valueProp?: Prop<T>;
  valueFormatter?: (val: T) => unknown;
  compareWith?: (o1: unknown, o2: unknown) => boolean;
}

@Component({
  selector: 'app-select-question',
  template: `
    <mat-form-field [color]="question.color || 'accent'" class="w-100">
        <mat-label *ngIf="question.label">{{ question.label }}</mat-label>
        <mat-select 
          [placeholder]="question.placeholder" 
          [formControl]="control" 
          [required]="required" 
          [compareWith]="question.compareWith || defaultCompareWith"
          (openedChange)="triggerOptions()">

            <ng-container *ngIf="(options$ | async) else loading; let options">
              <mat-option *ngIf="!required">Ingen</mat-option>
              <mat-option *ngFor="let option of options" 
                [value]="question.valueProp ? option[question.valueProp] : option">
                  {{ (question.valueFormatter | func : option) || option }}
              </mat-option>
            </ng-container>

            <ng-template #loading>
              <mat-option *ngIf="control?.value" [value]="control?.value">
                {{ (question.valueFormatter | func : control?.value) || control?.value }}
              </mat-option>
              <mat-option>Laster inn...</mat-option>
            </ng-template>

        </mat-select>
        <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>
        <mat-error *ngIf="control && control.dirty && control.invalid">
          {{ getValidationErrorMessage() }}
        </mat-error>

    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectQuestionComponent extends BaseQuestionComponent<SelectQuestion<UnknownState>> implements QuestionComponent {

  defaultCompareWith = (o1: unknown, o2: unknown) => o1 === o2;

  state: Maybe<UnknownState> = this.formStore.formState;

  options$: Observable<ImmutableArray<unknown>>;

  private get _options$(): Observable<ImmutableArray<unknown>> {
    return this.formStore.getOptions$(this.question.optionsGetter);
  }

  constructor(
    @Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap,
    private formStore: DynamicFormStore<UnknownState>) { 
    super(validationErrorMessages) 
  }

  ngOnInit(): void { 
    if(_shouldEagerOptions(this.question.lazyOptions, this.control)) 
      this.options$ = this._options$;
  }

  triggerOptions(): void{
    if(!this.options$) this.options$ = this._options$;
  }

}

@NgModule({
  declarations: [SelectQuestionComponent],
  imports:[
    SharedModule,  
    MatFormFieldModule, 
    MatSelectModule
  ]
})
class SelectQuestionModule {}