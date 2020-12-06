import { Validators } from '@angular/forms';
import { Employer, Mission, MissionChild, User } from 'src/app/core/models';
import { IAddress } from 'src/app/core/models/sub-interfaces/iaddress.interface';
import { IId } from 'src/app/core/models/sub-interfaces/iid.interface';
import { IName } from 'src/app/core/models/sub-interfaces/iname.interface';
import { DynamicControl } from 'src/app/dynamic-forms/interfaces';
import { StateMissions, StateEmployers, StateUsers } from 'src/app/state/interfaces';
import { AutoCompleteQuestionComponent } from '../components/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../components/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { GooglePlacesAutoCompleteQuestionComponent, GooglePlacesAutoCompleteQuestion } from '../components/dynamic-form-questions/google-places-autocomplete-question.component';
import { InputQuestionComponent, InputQuestion } from '../components/dynamic-form-questions/input-question.component';
import { SelectQuestionComponent, SelectQuestion } from '../components/dynamic-form-questions/select-question.component';
import { _compareProp } from '../form/helpers/compare-with-prop.helper';
import { OptionsFormState } from '../form/interfaces';
import { isObjectValidator } from '../form/validators/is-object.validator';
import { ValidationRules } from './validation-rules.const';

export const HiddenIdControl = <DynamicControl<IId, any>>{ name: "id", required: true,
    type: "control", valueGetter: (s: IId) => s.id,         
}
export const HiddenMissionIdControl = <DynamicControl<MissionChild, any>>{ name: "missionId", required: true,
    type: "control", valueGetter: (s: MissionChild) => s.missionId,         
}
export const PhoneNumberControl = <DynamicControl<{phoneNumber: string}, any>>{ name: "phoneNumber", 
    type: "control", valueGetter: (s: {phoneNumber: string}) => s?.phoneNumber, 
    questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Kontaktnummer"}, 
    }], 
    validators: [
        Validators.minLength(ValidationRules.PhoneNumberMinLength), 
        Validators.maxLength(ValidationRules.PhoneNumberMaxLength)
    ] 
}
export const EmailControl = <DynamicControl<{email: string}, any>>{ name: "email", 
    type: "control", valueGetter: (s: {email: string}) => s?.email, 
    questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Epost"}, 
    }], 
    validators: [Validators.email] 
}
export const GoogleAddressControl = <DynamicControl<IAddress, any>>{ name: "address",
    type: "control", valueGetter: (s: IAddress) => s?.address, questions: [{
        component:  GooglePlacesAutoCompleteQuestionComponent,
        question: <GooglePlacesAutoCompleteQuestion>{
            placeholder: "Adresse", 
            hint: "F.eks. Furuberget 17, 1940 Bjørkelangen",
            resetable: true
        }, 
    }], 
    validators: [Validators.maxLength(ValidationRules.AddressMaxLength)] 
}
export const NameControl = <DynamicControl<IName, any>>{ name: "name",
    type: "control", valueGetter: (s: IName) => s?.name, questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Navn"}, 
    }], 
    validators: [Validators.maxLength(ValidationRules.NameMaxLength)] 
}
export const FirstNameControl = <DynamicControl<{firstName: string}, any>>{ name: "firstName",
    type: "control", valueGetter: (s: {firstName: string}) => s?.firstName, 
    questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Fornavn"}, 
    }], 
}
export const LastNameControl = <DynamicControl<{lastName: string}, any>>{ name: "lastName",
    type: "control", valueGetter: (s: {lastName: string}) => s?.lastName, 
    questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Etternavn"}, 
    }], 
}
export const MissionAutoCompleteControl = <DynamicControl<{mission: Mission}, OptionsFormState<StateMissions>>>{ name: "mission", 
    valueGetter: (s: {mission: Mission}) => s.mission,
    type: "control", questions: [{
        component:  AutoCompleteQuestionComponent,
        question: <AutoCompleteQuestion<Mission>>{
            optionsGetter: (state: OptionsFormState<StateMissions>) => state.options.missions,
            placeholder: "Oppdrag",
            valueFormatter: (val: Mission) => val.address,
            displayWith: (mission: Mission) => mission ? mission.address : null,
            resetable: true,
            activeFilter: { stringProps: ["address"], maxChecks: 50 }
        }, 
    }],
    validators: [isObjectValidator()], 
}
export const EmployerSelectControl = <DynamicControl<{employer: Employer}, OptionsFormState<StateEmployers>>>{ name: "employer",
    valueGetter: (s: {employer: Employer}) => s.employer,
    type: "control", questions: [{
        component:  SelectQuestionComponent,
        question: <SelectQuestion<Employer>>{
            optionsGetter: (s: OptionsFormState<StateEmployers>) => s.options.employers,
            valueFormatter: (val: Employer) => val.name,
            compareWith: _compareProp("id"),
            placeholder: "Velg oppdragsgiver",
        }, 
    }], 
}
export const UserSelectControl = <DynamicControl<{user: User}, OptionsFormState<StateUsers>>>{ name: "user",
    type: "control", valueGetter: (s: {user: User}) => s.user, questions: [{
        component:  SelectQuestionComponent,
        question: <SelectQuestion<User>>{
            optionsGetter: (state: OptionsFormState<StateUsers>) => state.options.users,
            valueFormatter: (val: User) => val.firstName + ' ' + val.lastName,
            compareWith: _compareProp("userName"),
            placeholder: "Velg ansatt",
        }, 
    }], 
} 
export const UserNameControl = <DynamicControl<{userName: string}, any>>{ name: "userName", 
    type: "control", valueGetter: (s: {userName: string}) => s?.userName, questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Brukernavn"}, 
    }], 
    validators: [
        Validators.pattern('^[a-zA-Z0-9_.-]*$'),
        Validators.minLength(4),
        Validators.maxLength(ValidationRules.NameMaxLength)
    ] 
}