import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Maybe } from 'global-types';
import { Observable } from 'rxjs';
import { _getValidationErrorMessage } from '../helpers/get-validation-error-message.helper';
import { Question, QuestionComponent, ValidationErrorMap } from '../interfaces';

@Directive()
export abstract class BaseQuestionComponent<TQuestion extends Question>
    implements QuestionComponent {

  @HostBinding('style.width') width: string;

  control: Maybe<AbstractControl>;
  form: FormGroup;
  required: boolean;
  hideField$: Observable<boolean>;

  private _question: TQuestion;
  get question(): TQuestion { return this._question; }

  @Input() set question(value: TQuestion) {
      this._question = value;
      this.onQuestionChanges(value);  
  }

  constructor(private validationErrorMessages: ValidationErrorMap) {}

  /** Responsible for getting the validation error message based on errors on the control */
  getValidationErrorMessage(): Maybe<string> {
    return _getValidationErrorMessage(this.control?.errors, this.validationErrorMessages)
  } 

  /** Gets called when the @Input() question changes. */
  protected onQuestionChanges(question: TQuestion): void { 
    this.width = question.width || "100%"   
  }

}
