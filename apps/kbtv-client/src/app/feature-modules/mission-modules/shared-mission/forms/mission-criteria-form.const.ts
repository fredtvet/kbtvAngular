import { Mission, MissionType } from '@core/models';
import { StateMissions, StateEmployers, StateMissionTypes } from '@core/state/global-state.interfaces';
import { DynamicControl, DynamicForm, _formStateBinding } from 'dynamic-forms';
import { _compareProp } from '@shared-app/helpers/compare-with-prop.helper';
import { AutoCompleteQuestionComponent } from '@shared/scam/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '@shared/scam/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { RadioGroupQuestionComponent, RadioGroupQuestion } from '@shared/scam/dynamic-form-questions/radio-group-question.component';
import { SelectQuestionComponent, SelectQuestion } from '@shared/scam/dynamic-form-questions/select-question.component';
import { MissionCriteria } from '@shared/interfaces';
import { EmployerSelectControl } from '@shared/constants/common-controls.const';
import { Immutable } from 'global-types';

export type MissionCriteriaFormState = StateMissions & StateEmployers & StateMissionTypes

export interface MissionCriteriaForm extends Pick<MissionCriteria, "searchString" | "missionType" | "employer" | "finished"> {}

type FormState = MissionCriteriaFormState;

const SearchStringControl: Immutable<DynamicControl<string, FormState, AutoCompleteQuestion<Mission, FormState>>> = { 
    questionComponent:  AutoCompleteQuestionComponent,
    question: {
        valueFormatter: (val) => val.address,
        valueProp: "address",
        lazyOptions: "all",
        placeholder: "Søk med adresse",
        resetable: true,
        activeFilter: { stringProps: ["address"], maxChecks: 50 },
        stateBindings: {
            options: _formStateBinding<FormState, Mission[]>()(["missions"], (s) => s.missions || [])
        }
    }, 
}
const MissionTypeControl: Immutable<DynamicControl<MissionType, FormState, SelectQuestion<MissionType, FormState>>> = { 
    questionComponent:  SelectQuestionComponent,
    question: {
        valueFormatter: (val) => val.name,
        compareWith: _compareProp<MissionType>("id"),
        lazyOptions: "all",
        placeholder: "Velg oppdragstype",
        stateBindings: {
            options: _formStateBinding<FormState, MissionType[]>()(["missionTypes"], (s) => s.missionTypes || [])
        }
    }, 
}
const FinishedControl: Immutable<DynamicControl<boolean, FormState, RadioGroupQuestion<boolean, null>>> = { 
    questionComponent:  RadioGroupQuestionComponent,
    question: {   
        label: "Velg status",
        valueFormatter: (finished) => finished ? "Ferdig" : "Aktiv",
        stateBindings: { options: [false, true] }
    }, 
}

export const MissionCriteriaForm: Immutable<DynamicForm<MissionCriteria, FormState>> = {
    submitText: "Bruk", 
    resettable: true, resetState: {finished: false},
    controls: {
        searchString: SearchStringControl,
        employer: EmployerSelectControl,
        missionType: MissionTypeControl,
        finished: FinishedControl
    },
}