import { StateMissions, StateUsers } from '@core/state/global-state.interfaces';
import { DateRangePresets } from '@shared-app/enums/date-range-presets.enum';
import { TimesheetCriteria } from '@shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { DateRange, _getISO, _getMonthRange } from 'date-time-helpers';
import { DynamicControl, DynamicControlGroup, DynamicForm } from 'dynamic-forms';
import { Immutable, Maybe } from 'global-types';
import { translations } from '../../../shared-app/translations';
import { TimesheetStatus } from '../../enums';
import { IonDateQuestion, IonDateQuestionComponent } from '../../scam/dynamic-form-questions/ion-date-time-question.component';
import { RadioGroupQuestion, RadioGroupQuestionComponent } from '../../scam/dynamic-form-questions/radio-group-question.component';
import { MissionAutoCompleteControl, UserSelectControl } from '../common-controls.const';

export interface TimesheetCriteriaFormState { options: StateUsers & StateMissions }

export interface TimesheetCriteriaForm extends Pick<TimesheetCriteria, "dateRange" | "dateRangePreset" | "status" | "user" | "mission"> {
    customMonthISO: Maybe<string>;
};

type FormState = TimesheetCriteriaFormState;  

const DateRangePresetControl: Immutable<DynamicControl<TimesheetCriteriaForm, "dateRangePreset">> = { 
    type: "control", name: "dateRangePreset", required: true,
    questionComponent: RadioGroupQuestionComponent,
    question: <RadioGroupQuestion<DateRangePresets, null>>{   
        label: "Velg tidsrom *",
        optionsGetter: Object.keys(DateRangePresets).filter(k => !isNaN(Number(k))).map(x =>  parseInt(x)),
        valueFormatter: (val: DateRangePresets) => translations[DateRangePresets[val].toLowerCase()] 
    }, 
}
const CustomDateRangeControlGroup: Immutable<DynamicControlGroup<TimesheetCriteriaForm, "dateRange">> = { 
    type: "group", name: "dateRange", panelClass: "date-range-question-group",
    controls: {
        start: { type: "control", name: "start",
            valueFormatter: (val) => val ? _getISO(val) : null,
            questionComponent: IonDateQuestionComponent,
            question: <IonDateQuestion<DateRange>>{
                placeholder: "Startdato", 
                width: "45%",
                ionFormat:"YYYY-MMMM-DD",
                datePipeFormat: "MMM d, y",
                max: {controlName: ["dateRange", "end"], callback: (val: unknown) => val},
            },  
        },
        end: { type: "control", name: "end",
            valueFormatter: (val) => val ? _getISO(val) : null,
            questionComponent: IonDateQuestionComponent,
            question: <IonDateQuestion<DateRange>>{
                placeholder: "Sluttdato", 
                width: "45%",
                ionFormat:"YYYY-MMMM-DD",      
                datePipeFormat: "MMM d, y", 
                min: {controlName: ["dateRange", "start"], callback: (val: unknown) => val},
            },  
        },
    }
}
const CustomMonthControl: Immutable<DynamicControl<TimesheetCriteriaForm, "customMonthISO">> = { 
    type: "control", name: "customMonthISO", panelClass: "mt-0",
    questionComponent:  IonDateQuestionComponent,        
    question:<IonDateQuestion<TimesheetCriteriaForm>>{
        valueGetter: (val: string) => val ? _getISO(val) : null,
        placeholder: "Måned", 
        width: "50%",
        ionFormat:"YYYY-MMMM",
        datePipeFormat: "MMMM, y",                     
    }, 
}
const StatusControl: Immutable<DynamicControl<TimesheetCriteriaForm, "status">> = { 
    type: "control", name: "status",
    questionComponent:  RadioGroupQuestionComponent,
    question: <RadioGroupQuestion<TimesheetStatus, null>>{   
        label: "Velg status", defaultOption: "Begge",
        optionsGetter: [TimesheetStatus.Open, TimesheetStatus.Confirmed],
        valueFormatter: (val) => translations[TimesheetStatus[val]?.toLowerCase()]
    }, 
}

export const TimesheetCriteriaForm: Immutable<DynamicForm<TimesheetCriteriaForm, FormState>> = {
    submitText: "Bruk", noRenderDisabledControls: true, 
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
    }
}