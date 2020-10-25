import { Validators } from '@angular/forms';
import { Employer } from 'src/app/core/models';
import { DynamicControl, DynamicForm } from '../dynamic-form/interfaces';
import { GooglePlacesAutoCompleteQuestion, GooglePlacesAutoCompleteQuestionComponent } from '../dynamic-form/questions/google-places-autocomplete-question.component';
import { InputQuestion, InputQuestionComponent } from '../dynamic-form/questions/input-question.component';
import { SaveModelFormState } from '../model-form/interfaces';

type FormState = SaveModelFormState;

const NameControl = <DynamicControl<Employer>>{ name: "name", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Navn"}, 
    }], 
    validators: [Validators.maxLength(200)] 
}
const PhoneNumberControl = <DynamicControl<Employer>>{ name: "phoneNumber",
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Kontaktnummer"}, 
    }], 
    validators: [Validators.minLength(4), Validators.maxLength(12)] 
}
const AddressControl = <DynamicControl<Employer>>{ name: "address",
    type: "control", questions: [{
        component:  GooglePlacesAutoCompleteQuestionComponent,
        question: <GooglePlacesAutoCompleteQuestion>{
            placeholder: "Adresse",
            hint: "F.eks. Furuberget 17, 1940 Bjørkelangen",
            resetable: true
        }, 
    }], 
    validators: [Validators.maxLength(100)] 
}
const EmailControl = <DynamicControl<Employer>>{ name: "email",
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Epost"}, 
    }], 
    validators: [Validators.email] 
}

export const CreateEmployerForm: DynamicForm<Employer, FormState> = {
    submitText: "Legg til",
    controls: [NameControl, PhoneNumberControl, AddressControl, EmailControl],
}