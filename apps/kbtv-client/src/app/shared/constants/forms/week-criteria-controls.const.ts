import { StateUsers } from '@core/state/global-state.interfaces';
import { DynamicControl, DynamicForm } from 'dynamic-forms';
import { OptionsFormState } from 'form-sheet';
import { WeekCriteria } from '@shared-timesheet/interfaces';
import { InputQuestion, InputQuestionComponent } from '../../scam/dynamic-form-questions/input-question.component';
import { IonDateQuestion, IonDateQuestionComponent } from '../../scam/dynamic-form-questions/ion-date-time-question.component';
import { UserSelectControl } from '../common-controls.const';
import { isWeekInRange } from '@shared/validators/is-week-in-range.validator';
import { Immutable } from 'global-types';

export interface WeekCriteriaFormState extends OptionsFormState<StateUsers>{ }

type FormState = WeekCriteriaFormState;

export const WeekCriteriaForm: Immutable<DynamicForm<WeekCriteria, FormState>> = {
    submitText: "Bruk", controls: [
        {...UserSelectControl, required: true},
        { name: "year", required: true,
            type: "control", valueGetter: (s: WeekCriteria) => s.year, questions: [{
                component:  IonDateQuestionComponent,
                question: <IonDateQuestion>{ 
                    placeholder: "Velg år", 
                    ionFormat: "YYYY", 
                    valueSetter: (val: string) => new Date(val).getFullYear() 
                }, 
            }], 
        },
        { name: "weekNr", required: true,
            type: "control", valueGetter: (s: WeekCriteria) => s.weekNr, questions: [{
                component:  InputQuestionComponent,      
                hideOnValueChange: {controlName: "weekNr", callback: (val: number) => val == null},
                question: <InputQuestion>{ placeholder: "Velg uke", type: "tel" }, 
            }], 
        },
    ],
    validators: [isWeekInRange("weekNr", "year")]
}