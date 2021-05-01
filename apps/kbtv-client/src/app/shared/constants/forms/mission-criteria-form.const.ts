import { Mission, MissionType } from '@core/models';
import { StateMissions, StateEmployers, StateMissionTypes } from '@core/state/global-state.interfaces';
import { DynamicControl, DynamicForm } from 'dynamic-forms';
import { _compareProp } from '@shared-app/helpers/compare-with-prop.helper';
import { AutoCompleteQuestionComponent } from '../../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { RadioGroupQuestionComponent, RadioGroupQuestion } from '../../scam/dynamic-form-questions/radio-group-question.component';
import { SelectQuestionComponent, SelectQuestion } from '../../scam/dynamic-form-questions/select-question.component';
import { MissionCriteria } from '../../interfaces';
import { EmployerSelectControl } from '../common-controls.const';
import { Immutable } from 'global-types';

export interface MissionCriteriaFormState { options: StateMissions & StateEmployers & StateMissionTypes } {}

export interface MissionCriteriaForm extends Pick<MissionCriteria, "searchString" | "missionType" | "employer" | "finished"> {}

type FormState = MissionCriteriaFormState;

const SearchStringControl: Immutable<DynamicControl<MissionCriteria, "searchString", FormState>> = { 
    type: "control", name: "searchString", 
    questionComponent:  AutoCompleteQuestionComponent,
    question: <AutoCompleteQuestion<Mission, FormState>>{
        optionsGetter: (s) => s.options?.missions,
        valueFormatter: (val) => val.address,
        valueProp: "address",
        lazyOptions: "all",
        placeholder: "Søk med adresse",
        resetable: true,
        activeFilter: { stringProps: ["address"], maxChecks: 50 }
    }, 
}
const MissionTypeControl: Immutable<DynamicControl<MissionCriteria, "missionType", FormState>> = { 
    type: "control", name: "missionType",
    questionComponent:  SelectQuestionComponent,
    question: <SelectQuestion<MissionType, FormState>>{
        optionsGetter: (s) => s.options?.missionTypes, 
        valueFormatter: (val) => val.name,
        compareWith: _compareProp<MissionType>("id"),
        lazyOptions: "all",
        placeholder: "Velg oppdragstype",
    }, 
}
const FinishedControl: Immutable<DynamicControl<MissionCriteria, "finished", FormState>> = { 
    type: "control", name: "finished",
    questionComponent:  RadioGroupQuestionComponent,
    question: <RadioGroupQuestion<boolean, null>>{   
        label: "Velg status", optionsGetter: [false, true],
        valueFormatter: (finished: boolean) => finished ? "Ferdig" : "Aktiv"
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