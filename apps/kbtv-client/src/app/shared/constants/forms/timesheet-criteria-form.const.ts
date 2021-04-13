import { StateMissions, StateUsers } from '@core/state/global-state.interfaces';
import { DateRangePresets } from '@shared-app/enums/date-range-presets.enum';
import { TimesheetCriteria } from '@shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { DateRange, _getISO, _getMonthRange } from 'date-time-helpers';
import { DynamicControl, DynamicControlGroup, DynamicForm } from 'dynamic-forms';
import { OptionsFormState } from 'form-sheet';
import { Immutable } from 'global-types';
import { translations } from '../../../shared-app/translations';
import { IonDateQuestion, IonDateQuestionComponent } from '../../components/dynamic-form-questions/ion-date-time-question.component';
import { RadioGroupQuestion, RadioGroupQuestionComponent } from '../../components/dynamic-form-questions/radio-group-question.component';
import { TimesheetStatus } from '../../enums';
import { MissionAutoCompleteControl, UserSelectControl } from '../common-controls.const';

export interface TimesheetCriteriaFormState extends OptionsFormState<StateUsers & StateMissions>{}

type FormState = TimesheetCriteriaFormState;  

const DateRangePresetControl: Immutable<DynamicControl<TimesheetCriteria, FormState>> = { name: "dateRangePreset", required: true,
    valueGetter: (s: TimesheetCriteria) => s.dateRangePreset, 
    type: "control", questions: [{
        component:  RadioGroupQuestionComponent,
        question: <RadioGroupQuestion<DateRangePresets>>{   
            label: "Velg tidsrom *",
            optionsGetter: Object.keys(DateRangePresets).filter(k => !isNaN(Number(k))).map(x =>  parseInt(x)),
            valueFormatter: (val: DateRangePresets) => translations[DateRangePresets[val].toLowerCase()] 
        }, 
    }], 
}
const DateRangeControlGroup: Immutable<DynamicControlGroup<TimesheetCriteria, FormState, DateRange>> = { name: "dateRange", 
    panelClass: "date-range-question-group",
    type: "group", controls: [
        { name: "start",
            valueGetter: (s: TimesheetCriteria) => s.dateRange?.start ? _getISO(s.dateRange.start) : null,
            type: "control", questions: [
                {component:  IonDateQuestionComponent,       
                    hideOnValueChange: {controlName: "dateRangePreset", callback: (val) => val !== DateRangePresets.Custom},
                    question: <IonDateQuestion>{
                        placeholder: "Startdato", 
                        width: "45%",
                        ionFormat:"YYYY-MMMM-DD",
                        datePipeFormat: "MMM d, y",
                        max: {controlName: ["dateRange", "end"], callback: (val: unknown) => val},
                    }, 
                },
                {component:  IonDateQuestionComponent,        
                    hideOnValueChange: {controlName: "dateRangePreset", callback: (val) => val !== DateRangePresets.CustomMonth},
                    question:<IonDateQuestion>{
                        placeholder: "Måned", 
                        width: "50%",
                        ionFormat:"YYYY-MMMM",
                        datePipeFormat: "MMMM, y",                    
                        valueSetter: (val: string) => val ? _getMonthRange(val, true) : {start: null, end: null},
                        overrideValueSetterControl: "dateRange"
                    }, 
                }
            ], 
        },
        { name: "end",
            valueGetter: (s: TimesheetCriteria) => s.dateRange?.end ? _getISO(s.dateRange.end) : null,
            type: "control", questions: [
                {component:  IonDateQuestionComponent,              
                hideOnValueChange: {controlName: "dateRangePreset", callback: (val) => val !== DateRangePresets.Custom},
                question: <IonDateQuestion>{
                    placeholder: "Sluttdato", 
                    width: "45%",
                    ionFormat:"YYYY-MMMM-DD",      
                    datePipeFormat: "MMM d, y", 
                    min: {controlName: ["dateRange", "start"], callback: (val: unknown) => val},
                }, 
            }], 
        },
    ]
}
const StatusControl: Immutable<DynamicControl<TimesheetCriteria, FormState>> = { name: "status",
    valueGetter: (s: TimesheetCriteria) => s.status, 
    type: "control", questions: [{
        component:  RadioGroupQuestionComponent,
        question: <RadioGroupQuestion<TimesheetStatus>>{   
            label: "Velg status", defaultOption: "Begge",
            optionsGetter: [TimesheetStatus.Open, TimesheetStatus.Confirmed],
            valueFormatter: (val) => translations[TimesheetStatus[val]?.toLowerCase()]
        }, 
    }], 
}

export const TimesheetCriteriaForm: Immutable<DynamicForm<TimesheetCriteria, FormState>> = {
    submitText: "Bruk", noRenderDisabledControls: true, resettable: true,
    controls: [
        UserSelectControl,
        {...MissionAutoCompleteControl, required: false},
        DateRangePresetControl,
        DateRangeControlGroup,
        StatusControl
    ],
}