import { Mission, MissionType } from '@core/models';
import { StateMissions, StateEmployers, StateMissionTypes } from '@core/state/global-state.interfaces';
import { DynamicControl, DynamicForm } from 'dynamic-forms';
import { OptionsFormState } from 'form-sheet';
import { _compareProp } from '@shared-app/helpers/compare-with-prop.helper';
import { AutoCompleteQuestionComponent } from '../../components/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../components/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { RadioGroupQuestionComponent, RadioGroupQuestion } from '../../components/dynamic-form-questions/radio-group-question.component';
import { SelectQuestionComponent, SelectQuestion } from '../../components/dynamic-form-questions/select-question.component';
import { MissionCriteria } from '../../interfaces';
import { EmployerSelectControl } from '../common-controls.const';
import { Immutable } from 'global-types';

export interface MissionCriteriaFormState 
    extends OptionsFormState<StateMissions & StateEmployers & StateMissionTypes> {}

type FormState = MissionCriteriaFormState;

const SearchStringControl: Immutable<DynamicControl<MissionCriteria, FormState>> = { name: "searchString", 
    valueGetter: (s: MissionCriteria) => s.searchString,
    type: "control", questions: [{
        component:  AutoCompleteQuestionComponent,
        question: <AutoCompleteQuestion<Mission>>{
            optionsGetter: (s: FormState) => s.options?.missions,
            valueFormatter: (val: Mission) => val.address,
            valueProp: "address",
            lazyOptions: "all",
            placeholder: "Søk med adresse",
            resetable: true,
            activeFilter: { stringProps: ["address"], maxChecks: 50 }
        }, 
    }], 
}
const MissionTypeControl: Immutable<DynamicControl<MissionCriteria, FormState>> = { name: "missionType",
    valueGetter: (s: MissionCriteria) => s.missionType,
    type: "control", questions: [{
        component:  SelectQuestionComponent,
        question: <SelectQuestion<MissionType>>{
            optionsGetter: (s: FormState) => s.options?.missionTypes, 
            valueFormatter: (val: MissionType) => val.name,
            compareWith: _compareProp<MissionType>("id"),
            lazyOptions: "all",
            placeholder: "Velg oppdragstype",
        }, 
    }], 
}
const FinishedControl: Immutable<DynamicControl<MissionCriteria, FormState>> = { name: "finished",
    valueGetter: (s: MissionCriteria) => s.finished, 
    type: "control", questions: [{
        component:  RadioGroupQuestionComponent,
        question: <RadioGroupQuestion<boolean>>{   
            label: "Velg status", optionsGetter: [false, true],
            valueFormatter: (finished: boolean) => finished ? "Ferdig" : "Aktiv"
        }, 
    }], 
}

export const MissionCriteriaForm: Immutable<DynamicForm<MissionCriteria, FormState>> = {
    submitText: "Bruk", resettable: true, resetState: {finished: false},
    controls: [
        SearchStringControl,
        EmployerSelectControl,
        MissionTypeControl,
        FinishedControl
    ],
}