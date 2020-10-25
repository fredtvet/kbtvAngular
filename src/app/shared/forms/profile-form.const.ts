import { Validators } from '@angular/forms';
import { User } from 'src/app/core/models';
import { DynamicControl, DynamicForm } from '../dynamic-form/interfaces';
import { InputQuestion, InputQuestionComponent } from '../dynamic-form/questions/input-question.component';
import { SaveModelFormState } from '../model-form/interfaces';

type FormState = SaveModelFormState;

const UserNameControl = <DynamicControl<User>>{ name: "userName", required: true,
    type: "control", valueGetter: (s: User) => s.userName, 
    questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Brukernavn"}, 
    }], 
}
const FirstNameControl = <DynamicControl<User>>{ name: "firstName", required: true,
    type: "control", valueGetter: (s: User) => s.firstName, 
    questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Fornavn"}, 
    }], 
}
const LastNameControl = <DynamicControl<User>>{ name: "lastName", required: true,
    type: "control", valueGetter: (s: User) => s.lastName, 
    questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Etternavn"}, 
    }], 
}
const PhoneNumberControl = <DynamicControl<User>>{ name: "phoneNumber", 
    type: "control", valueGetter: (s: User) => s.phoneNumber, 
    questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Kontaktnummer"}, 
    }], 
    validators: [Validators.minLength(4), Validators.maxLength(12)] 
}
const EmailControl = <DynamicControl<User>>{ name: "email", 
    type: "control", valueGetter: (s: User) => s.email, 
    questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Epost"}, 
    }], 
    validators: [Validators.email] 
}

export const ProfileForm: DynamicForm<User, FormState> = {
    submitText: "Oppdater", getRawValue: true,
    disabledControls: {userName: true, firstName: true, lastName: true},
    controls: [
        UserNameControl,
        FirstNameControl,
        LastNameControl,
        PhoneNumberControl,
        EmailControl,
    ],
}