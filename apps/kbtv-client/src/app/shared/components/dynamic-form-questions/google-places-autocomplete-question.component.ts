import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/shared.module';
import { BaseQuestionComponent, Question, QuestionComponent, ValidationErrorMap, VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { Address, GooglePlacesAutocompleteModule, Options } from 'google-places-autocomplete';

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
        <input lib-google-places-autocomplete
            [options]="googleOptions"
            [placeholder]="question.placeholder" 
            [formControl]="control" 
            [required]="required"
            (onAddressChange)="onAddressChange($event)"  matInput />
        
        <mat-hint *ngIf="question.hint">{{ question.hint }}</mat-hint>

        <button mat-icon-button matSuffix *ngIf="question.resetable && control && !control.disabled  && control.value" aria-label="Clear" 
            (tap)="control.setValue(''); control.markAsDirty()">
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

    constructor(
        @Inject(VALIDATION_ERROR_MESSAGES) validationErrorMessages: ValidationErrorMap,
        @Inject(DOCUMENT) private document: Document
    ) { 
        super(validationErrorMessages);   
    }

    onAddressChange(address: Address){
        this.control?.setValue(this.addressFormatter(address))
    }

    ngOnDestroy(): void {
        const body = this.document.getElementsByTagName('body')[0];
        const elements = body.getElementsByClassName("pac-container");
        for(let i = 0; i < elements.length; i++) elements[i].remove();    
    }

    protected onQuestionChanges(value: GooglePlacesAutoCompleteQuestion): void{
        super.onQuestionChanges(value);

        if(this.question.addressFormatter) 
            this.addressFormatter = this.question.addressFormatter
        if(this.question.options)
            this.googleOptions = {...this.googleOptions, ...this.question.options}
    }   

}

@NgModule({
    declarations: [GooglePlacesAutoCompleteQuestionComponent],
    imports:[
      SharedModule,  
      GooglePlacesAutocompleteModule, 
      MatFormFieldModule,
      MatInputModule,
    ]
  })
class GooglePlacesAutoCompleteQuestionModule {}
  