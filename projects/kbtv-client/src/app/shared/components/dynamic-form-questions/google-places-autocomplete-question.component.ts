import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BaseQuestionComponent, Question, QuestionComponent, ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';

export interface GooglePlacesAutoCompleteQuestion extends Question {
    options?: Partial<Options>;
    addressFormatter?: (address: Address) => string; 
    resetable?: boolean;
}

@Component({
  selector: 'app-google-places-autocomplete-question',
  template: `
    <mat-form-field [color]="question.color || 'accent'" class="w-100">
        <mat-label *ngIf="question.label">{{ question.label }}</mat-label>
        <input ngx-google-places-autocomplete
            [options]="googleOptions"
            [placeholder]="question.placeholder" 
            [formControl]="control" 
            [required]="required"
            (onAddressChange)="onAddressChange($event)"  matInput />
        
        <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>

        <button mat-icon-button matSuffix *ngIf="question.resetable && control && !control.disabled  && control.value" aria-label="Clear" 
            (click)="control.setValue(''); control.markAsDirty()">
            <mat-icon>close</mat-icon>
        </button>

        <mat-error *ngIf="control?.dirty && control?.invalid">
            {{ getValidationErrorMessage() }}
        </mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GooglePlacesAutoCompleteQuestionComponent extends BaseQuestionComponent<GooglePlacesAutoCompleteQuestion> 
    implements QuestionComponent {
    
    googleOptions: Immutable<Partial<Options>> = {
        types: ['geocode'],
        componentRestrictions: { country: "no" }
    };

    addressFormatter = (address: Address) => address.formatted_address

    constructor(@Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap) { 
        super(validationErrorMessages);   
    }

    onAddressChange(address: Address){
        this.control?.setValue(this.addressFormatter(address))
    }

    protected onQuestionChanges(value: GooglePlacesAutoCompleteQuestion): void{
        super.onQuestionChanges(value);

        if(this.question.addressFormatter) 
            this.addressFormatter = this.question.addressFormatter
        if(this.question.options)
            this.googleOptions = {...this.googleOptions, ...this.question.options}
    }   

}
