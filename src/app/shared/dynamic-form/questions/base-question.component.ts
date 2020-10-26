import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { _getValidationErrorMessage } from '../helpers/get-validation-error-message.helper';
import { Question, QuestionComponent } from '../interfaces';
import { ValidationErrorMap } from '../validation-error-map.interface';

@Directive()
export abstract class BaseQuestionComponent<TQuestion extends Question>
    implements QuestionComponent {

  @HostBinding('style.width') width: string;

  control: AbstractControl;
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

  getValidationErrorMessage(): string{
    return _getValidationErrorMessage(this.control.errors, this.validationErrorMessages)
  }

  protected onQuestionChanges(question: TQuestion): void { 
    this.width = question.width || "100%"   
  }

}
