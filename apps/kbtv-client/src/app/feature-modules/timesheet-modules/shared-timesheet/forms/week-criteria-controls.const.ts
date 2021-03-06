import { StateUsers } from '@core/state/global-state.interfaces';
import { WeekCriteria } from '@shared-timesheet/interfaces';
import { isWeekInRange } from '@shared/validators/is-week-in-range.validator';
import { Immutable } from 'global-types';
import { DynamicForm } from 'dynamic-forms';
import { UserSelectControl } from '@shared/constants/common-controls.const';
import { InputQuestionComponent, InputQuestion } from '@shared/scam/dynamic-form-questions/input-question.component';
import { IonDateQuestionComponent, IonDateQuestion } from '@shared/scam/dynamic-form-questions/ion-date-time-question.component';

export type WeekCriteriaFormState = StateUsers;
export interface WeekCriteriaForm extends Pick<WeekCriteria, "user" | "year" | "weekNr"> {}

type FormState = WeekCriteriaFormState;

export const WeekCriteriaForm: Immutable<DynamicForm<WeekCriteriaForm, FormState>> = {
    submitText: "Bruk", 
    hideOnValueChangeMap: { weekNr: (s) => s.weekNr == null },
    validators: [isWeekInRange("weekNr", "year")],
    controls: {
        user: {...UserSelectControl, required: true},
        year: { required: true,
            questionComponent: IonDateQuestionComponent,     
            question: <IonDateQuestion<WeekCriteria>>{ 
                placeholder: "Velg år", 
                ionFormat: "YYYY", 
                valueSetter: (val) => new Date(val).getFullYear() 
            },
        },
        weekNr: { required: true,
            questionComponent: InputQuestionComponent,
            question: <InputQuestion>{ placeholder: "Velg uke", type: "tel" }, 
        },
    },
}