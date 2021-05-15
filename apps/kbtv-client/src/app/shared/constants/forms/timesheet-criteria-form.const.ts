import { StateMissions, StateUsers } from '@core/state/global-state.interfaces';
import { DateRangePresets } from '@shared-app/enums/date-range-presets.enum';
import { TimesheetCriteria } from '@shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { DateRange, _getISO } from 'date-time-helpers';
import { DynamicControl, DynamicControlGroup, DynamicForm, _formStateBinding, _formStateSetter } from 'dynamic-forms';
import { Immutable, Maybe, NotNull } from 'global-types';
import { translations } from '../../../shared-app/translations';
import { TimesheetStatus } from '../../enums';
import { IonDateQuestion, IonDateQuestionComponent } from '../../scam/dynamic-form-questions/ion-date-time-question.component';
import { RadioGroupQuestion, RadioGroupQuestionComponent } from '../../scam/dynamic-form-questions/radio-group-question.component';
import { MissionAutoCompleteControl, UserSelectControl } from '../common-controls.const';

export type TimesheetCriteriaFormState = StateUsers & StateMissions & { startMax: string, startMin: string, endMax: string, endMin: string }

export interface TimesheetCriteriaForm extends NotNull<Pick<TimesheetCriteria, "dateRange" | "dateRangePreset" | "status" | "user" | "mission">> {
    customMonthISO: Maybe<string>;
};

type FormState = TimesheetCriteriaFormState;  

const DateRangePresetControl: Immutable<DynamicControl<DateRangePresets>> = { 
    required: true, questionComponent: RadioGroupQuestionComponent,
    question: <RadioGroupQuestion<DateRangePresets, null>>{   
        label: "Velg tidsrom *",
        valueFormatter: (val: DateRangePresets) => translations[DateRangePresets[val].toLowerCase()],
        stateBindings:{ 
            options: Object.keys(DateRangePresets).filter(k => !isNaN(Number(k))).map(x =>  parseInt(x))
        }
    }, 
}
const CustomDateRangeControlGroup: Immutable<DynamicControlGroup<DateRange, FormState>> = { 
    panelClass: "date-range-question-group",
    controls: {
        start: {
            valueFormatter: (val) => val ? _getISO(val) : null,
            questionComponent: IonDateQuestionComponent,
            question: <IonDateQuestion<TimesheetCriteriaFormState>>{
                placeholder: "Startdato", 
                width: "45%",
                ionFormat:"YYYY-MMMM-DD",
                datePipeFormat: "MMM d, y",
                stateBindings: {
                    min: _formStateBinding<FormState, string>()(["startMin"], (s) => s.startMin ),         
                    max: _formStateBinding<FormState, string>()(["startMax"], (s) => s.startMax )
                }              
            },  
        },
        end: {
            valueFormatter: (val) => val ? _getISO(val) : null,
            questionComponent: IonDateQuestionComponent,
            question: <IonDateQuestion<TimesheetCriteriaFormState>>{
                placeholder: "Sluttdato", 
                width: "45%",
                ionFormat:"YYYY-MMMM-DD",      
                datePipeFormat: "MMM d, y", 
                stateBindings: {
                    min: _formStateBinding<FormState, string>()(["endMin"], (s) => s.endMin ),         
                    max: _formStateBinding<FormState, string>()(["endMax"], (s) => s.endMax )
                }  
            },  
        },
    }
}
const CustomMonthControl: Immutable<DynamicControl<Maybe<string>>> = { 
    panelClass: "mt-0",
    questionComponent:  IonDateQuestionComponent,        
    question:<IonDateQuestion<TimesheetCriteriaForm>>{
        valueGetter: (val: string) => val ? _getISO(val) : null,
        placeholder: "Måned", 
        width: "50%",
        ionFormat:"YYYY-MMMM",
        datePipeFormat: "MMMM, y",                     
    }, 
}
const StatusControl: Immutable<DynamicControl<TimesheetStatus>> = { 
    questionComponent:  RadioGroupQuestionComponent,
    question: <RadioGroupQuestion<TimesheetStatus, null>>{   
        label: "Velg status", defaultOption: "Begge",
        valueFormatter: (val) => translations[TimesheetStatus[val]?.toLowerCase()],
        stateBindings: {
            options: [TimesheetStatus.Open, TimesheetStatus.Confirmed], 
        }   
    }, 
}

export const TimesheetCriteriaForm: Immutable<DynamicForm<TimesheetCriteriaForm, FormState>> = {
    submitText: "Bruk", options: { noRenderDisabledControls: true },
    resettable: true,
    controls: {
        user: UserSelectControl,
        mission: {...MissionAutoCompleteControl, required: false},
        dateRangePreset: DateRangePresetControl,
        dateRange: CustomDateRangeControlGroup,
        customMonthISO: CustomMonthControl,
        status: StatusControl,
    },
    hideOnValueChangeMap: {
        customMonthISO: (val) => val.dateRangePreset !== DateRangePresets.CustomMonth,
        dateRange: (val) => val.dateRangePreset !== DateRangePresets.Custom,
    },
    formStateSetters: [
        _formStateSetter<TimesheetCriteriaForm, FormState>()(["dateRange.start"], [], (f) => { return { endMin: <string> f['dateRange.start'] } }),
        _formStateSetter<TimesheetCriteriaForm, FormState>()(["dateRange.end"], [], (f) => { return { startMax: <string> f['dateRange.end'] } })
    ]
}