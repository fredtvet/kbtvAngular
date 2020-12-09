import { StateUsers } from '@core/state/global-state.interfaces';
import { DynamicForm, DynamicControl } from '@dynamic-forms/interfaces';
import { OptionsFormState } from '@form-sheet/interfaces';
import { WeekCriteria } from '@shared-timesheet/interfaces';
import { InputQuestionComponent, InputQuestion } from '../../components/dynamic-form-questions/input-question.component';
import { IonDateQuestionComponent, IonDateQuestion } from '../../components/dynamic-form-questions/ion-date-time-question.component';
import { UserSelectControl } from '../common-controls.const';

export interface WeekCriteriaFormState extends OptionsFormState<StateUsers>{ }

type FormState = WeekCriteriaFormState;

export const WeekCriteriaForm: DynamicForm<WeekCriteria, FormState> = {
    submitText: "Bruk", controls: [
        {...UserSelectControl, required: true},
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