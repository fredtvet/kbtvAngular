import { User } from 'src/app/core/models';
import { StateUsers } from 'src/app/core/services/state/interfaces';
import { WeekCriteria } from 'src/app/timesheet-modules/shared-timesheet/interfaces';
import { DynamicControl, DynamicForm } from '../../dynamic-form/interfaces';
import { InputQuestion, InputQuestionComponent } from '../../dynamic-form/questions/input-question.component';
import { IonDateQuestion, IonDateQuestionComponent } from '../../dynamic-form/questions/ion-date-time-question.component';
import { SelectQuestion, SelectQuestionComponent } from '../../dynamic-form/questions/select-question.component';

export interface WeekCriteriaFormState {
    options: StateUsers
}

type FormState = WeekCriteriaFormState;

export const WeekCriteriaForm: DynamicForm<WeekCriteria, FormState> = {
    submitText: "Bruk", controls: [
        <DynamicControl<WeekCriteria>>{ name: "user", required: true,
            type: "control", valueGetter: (s: WeekCriteria) => s.user, questions: [{
                component:  SelectQuestionComponent,
                question: <SelectQuestion<User>>{
                    optionsGetter: (state: FormState) => state.options.users,
                    valueFormatter: (val: User) => val.firstName + ' ' + val.lastName,
                    compareWith: (opt: User, val: User) => opt?.userName === val?.userName,
                    placeholder: "Velg ansatt",
                }, 
            }], 
        },
        <DynamicControl<WeekCriteria>>{ name: "year", required: true,
            type: "control", valueGetter: (s: WeekCriteria) => s.year, questions: [{
                component:  IonDateQuestionComponent,
                question: <IonDateQuestion>{ 
                    placeholder: "Velg år", 
                    ionFormat: "YYYY", 
                    valueSetter: (val: string) => new Date(val).getFullYear() 
                }, 
            }], 
        },
        <DynamicControl<WeekCriteria>>{ name: "weekNr", required: true,
            type: "control", valueGetter: (s: WeekCriteria) => s.weekNr, questions: [{
                component:  InputQuestionComponent,      
                hideOnValueChange: {controlName: "weekNr", callback: (val: number) => val == null},
                question: <InputQuestion>{ placeholder: "Velg uke", type: "number" }, 
            }], 
        },
    ],
}