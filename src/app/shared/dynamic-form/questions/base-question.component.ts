import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Question, QuestionComponent } from '../interfaces';
import { ValidationErrorMap, ValidatorErrorMessages } from '../validator-error-messages.const';

@Directive()
export abstract class BaseQuestionComponent<TQuestion extends Question>
    implements QuestionComponent {

  @HostBinding('style.width') width: string;

  validationErrorMessages: ValidationErrorMap;
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

  constructor() {}

  getValidationErrorMessage(): string{
    if(this.control.hasError('required')) return this.getErrorMessage('required');
    for(const error of Object.keys(this.control.errors)){
      const errMessage = this.getErrorMessage(error);
      if(errMessage) return errMessage;
    }
  }

  private getErrorMessage(err: any): string{
    let errFn: (err: any) => string;

    if(this.validationErrorMessages)
      errFn = this.validationErrorMessages[err];

    if(!errFn) 
      errFn = ValidatorErrorMessages[err];

    if(errFn) return errFn(this.control.errors[err])
  }

  protected onQuestionChanges(question: TQuestion): void { 
    this.width = question.width || "100%"   
  }

}
