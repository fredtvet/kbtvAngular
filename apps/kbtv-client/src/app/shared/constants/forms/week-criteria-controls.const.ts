import { StateUsers } from '@core/state/global-state.interfaces';
import { WeekCriteria } from '@shared-timesheet/interfaces';
import { InputQuestion, InputQuestionComponent } from '../../scam/dynamic-form-questions/input-question.component';
import { IonDateQuestion, IonDateQuestionComponent } from '../../scam/dynamic-form-questions/ion-date-time-question.component';
import { UserSelectControl } from '../common-controls.const';
import { isWeekInRange } from '@shared/validators/is-week-in-range.validator';
import { Immutable } from 'global-types';
import { DynamicForm } from 'dynamic-forms';

export interface WeekCriteriaFormState { options: StateUsers }
export interface WeekCriteriaForm extends Pick<WeekCriteria, "user" | "year" | "weekNr"> {}

type FormState = WeekCriteriaFormState;

export const WeekCriteriaForm: Immutable<DynamicForm<WeekCriteriaForm, FormState>> = {
    submitText: "Bruk", 
    controls: {
        user: {...UserSelectControl, required: true},
        year: { type: "control", name: "year", required: true,
            questionComponent: IonDateQuestionComponent,     
            question: <IonDateQuestion<WeekCriteria>>{ 
                placeholder: "Velg år", 
                ionFormat: "YYYY", 
                valueSetter: (val: string) => new Date(val).getFullYear() 
            },
        },
        weekNr: { type: "control", name: "weekNr", required: true,
            questionComponent: InputQuestionComponent,
            question: <InputQuestion>{ placeholder: "Velg uke", type: "tel" }, 
        },
    },
    hideOnValueChangeMap: { weekNr: (s) => s.weekNr == null },
    validators: [isWeekInRange("weekNr", "year")]
}