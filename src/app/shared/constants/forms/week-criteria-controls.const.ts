import { StateUsers } from 'src/app/core/services/state/interfaces';
import { WeekCriteria } from 'src/app/timesheet-modules/shared-timesheet/interfaces';
import { DynamicControl, DynamicForm } from '../../dynamic-form/interfaces';
import { InputQuestion, InputQuestionComponent } from '../../dynamic-form/questions/input-question.component';
import { IonDateQuestion, IonDateQuestionComponent } from '../../dynamic-form/questions/ion-date-time-question.component';
import { OptionsFormState } from '../../form/options-form-state.interface';
import { UserSelectControl } from '../common-controls.const';

export interface WeekCriteriaFormState extends OptionsFormState<StateUsers>{ }

type FormState = WeekCriteriaFormState;

export const WeekCriteriaForm: DynamicForm<WeekCriteria, FormState> = {
    submitText: "Bruk", controls: [
        {...UserSelectControl, required: true},
        <DynamicControl<WeekCriteria, any>>{ name: "year", required: true,
            type: "control", valueGetter: (s: WeekCriteria) => s.year, questions: [{
                component:  IonDateQuestionComponent,
                question: <IonDateQuestion>{ 
                    placeholder: "Velg år", 
                    ionFormat: "YYYY", 
                    valueSetter: (val: string) => new Date(val).getFullYear() 
                }, 
            }], 
        },
        <DynamicControl<WeekCriteria, any>>{ name: "weekNr", required: true,
            type: "control", valueGetter: (s: WeekCriteria) => s.weekNr, questions: [{
                component:  InputQuestionComponent,      
                hideOnValueChange: {controlName: "weekNr", callback: (val: number) => val == null},
                question: <InputQuestion>{ placeholder: "Velg uke", type: "number" }, 
            }], 
        },
    ],
}