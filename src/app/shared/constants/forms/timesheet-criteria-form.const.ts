import { StateMissions, StateUsers } from 'src/app/core/services/state/interfaces';
import { DynamicControl, DynamicControlGroup, DynamicForm } from 'src/app/dynamic-forms/interfaces';
import { DateRangePresets } from 'src/app/shared-app/enums';
import { _getISO } from 'src/app/shared-app/helpers/datetime/get-iso-with-timezone.helper';
import { _getMonthRange } from 'src/app/shared-app/helpers/datetime/get-month-range.helper';
import { _getRangeByDateRangePreset } from 'src/app/shared-app/helpers/datetime/get-range-by-date-range-preset.helper';
import { TimesheetCriteria } from 'src/app/timesheet-modules/shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { IonDateQuestionComponent, IonDateQuestion } from '../../components/dynamic-form-questions/ion-date-time-question.component';
import { RadioGroupQuestionComponent, RadioGroupQuestion } from '../../components/dynamic-form-questions/radio-group-question.component';
import { TimesheetStatus } from '../../enums';
import { OptionsFormState } from '../../form/options-form-state.interface';
import { DateRange } from '../../interfaces/date-range.interface';
import { translations } from '../../translations';
import { MissionAutoCompleteControl, UserSelectControl } from '../common-controls.const';

export interface TimesheetCriteriaFormState extends OptionsFormState<StateUsers & StateMissions>{}

type FormState = TimesheetCriteriaFormState;  

const DateRangePresetControl = <DynamicControl<TimesheetCriteria, any>>{ name: "dateRangePreset", required: true,
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
const DateRangeControlGroup = <DynamicControlGroup<TimesheetCriteria>>{ name: "dateRange", 
    type: "group", controls: [
        <DynamicControl<DateRange, any>>{ name: "start",
            valueGetter: (s: TimesheetCriteria) => _getISO(s.dateRange?.start),
            type: "control", questions: [
                {component:  IonDateQuestionComponent,       
                    hideOnValueChange: {controlName: "dateRangePreset", callback: (val) => val !== DateRangePresets.Custom},
                    question: <IonDateQuestion>{
                        placeholder: "Startdato", 
                        width: "45%",
                        ionFormat:"YYYY-MMMM-DD",
                        datePipeFormat: "MMM d, y",
                        max: {controlName: ["dateRange", "end"], callback: (val: any) => val},
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
        <DynamicControl<DateRange, any>>{ name: "end",
            valueGetter: (s: TimesheetCriteria) => _getISO(s.dateRange?.end),
            type: "control", questions: [
                {component:  IonDateQuestionComponent,              
                hideOnValueChange: {controlName: "dateRangePreset", callback: (val) => val !== DateRangePresets.Custom},
                question: <IonDateQuestion>{
                    placeholder: "Sluttdato", 
                    width: "45%",
                    ionFormat:"YYYY-MMMM-DD",      
                    datePipeFormat: "MMM d, y", 
                    min: {controlName: ["dateRange", "start"], callback: (val: any) => val},
                }, 
            }], 
        },
    ]
}
const StatusControl = <DynamicControl<TimesheetCriteria, any>>{ name: "status",
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

export const TimesheetCriteriaForm: DynamicForm<TimesheetCriteria, FormState> = {
    submitText: "Bruk", noRenderDisabledControls: true, resettable: true,
    controls: [
        UserSelectControl,
        MissionAutoCompleteControl,
        DateRangePresetControl,
        DateRangeControlGroup,
        StatusControl
    ],
    onSubmitFormatter: (criteria: TimesheetCriteria): TimesheetCriteria => {
        const preset = criteria.dateRangePreset;  
        if(preset !== DateRangePresets.Custom && preset !== DateRangePresets.CustomMonth )
        criteria.dateRange = _getRangeByDateRangePreset(preset);
        
        const {start, end} = criteria.dateRange || {};
        if(start || end) criteria.dateRange = {start: new Date(start), end: new Date(end || new Date())};
        else criteria.dateRange = null;

        return criteria;
    }
}