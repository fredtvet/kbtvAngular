import { Mission, User } from 'src/app/core/models';
import { StateMissions, StateUsers } from 'src/app/core/services/state/interfaces';
import { DateRangePresets } from 'src/app/shared-app/enums';
import { _getISO } from 'src/app/shared-app/helpers/datetime/get-iso-with-timezone.helper';
import { _getMonthRange } from 'src/app/shared-app/helpers/datetime/get-month-range.helper';
import { _getRangeByDateRangePreset } from 'src/app/shared-app/helpers/datetime/get-range-by-date-range-preset.helper';
import { TimesheetCriteria } from 'src/app/timesheet-modules/shared-timesheet/interfaces';
import { DynamicControl, DynamicControlGroup, DynamicForm } from '../../dynamic-form/interfaces';
import { AutoCompleteQuestionComponent } from '../../dynamic-form/questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../dynamic-form/questions/auto-complete-question/auto-complete-question.interface';
import { IonDateQuestionComponent, IonDateQuestion } from '../../dynamic-form/questions/ion-date-time-question.component';
import { RadioGroupQuestionComponent, RadioGroupQuestion } from '../../dynamic-form/questions/radio-group-question.component';
import { SelectQuestionComponent, SelectQuestion } from '../../dynamic-form/questions/select-question.component';
import { TimesheetStatus } from '../../enums';
import { isObjectValidator } from '../../form/validators/is-object.validator';
import { DateRange } from '../../interfaces/date-range.interface';
import { translations } from '../../translations';

export interface TimesheetCriteriaFormState {
    options: StateUsers & StateMissions
}

type FormState = TimesheetCriteriaFormState;

const UserControl = <DynamicControl<TimesheetCriteria>>{ name: "user",
    type: "control", questions: [{
        component:  SelectQuestionComponent,
        question: <SelectQuestion<User>>{
            optionsGetter: (state: FormState) => state.options.users,
            valueFormatter: (val: User) => val.firstName + ' ' + val.lastName,
            placeholder: "Velg ansatt", defaultOption: "Ingen",
        }, 
    }], 
}
const MissionControl = <DynamicControl<TimesheetCriteria>>{ name: "mission", 
    valueGetter: (s: TimesheetCriteria) => s.mission,
    type: "control", questions: [{
        component:  AutoCompleteQuestionComponent,
        question: <AutoCompleteQuestion<Mission>>{
            optionsGetter: (state: FormState) => state.options.missions,
            placeholder: "Oppdrag",
            valueFormatter: (val: Mission) => val.address,
            displayWith: (mission: Mission) => mission ? mission.address : null,
            resetable: true,
            activeFilter: { stringProps: ["address"], maxChecks: 50 }
        }, 
    }],
    validators: [isObjectValidator(true)], 
}
const DateRangePresetControl = <DynamicControl<TimesheetCriteria>>{ name: "dateRangePreset", required: true,
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
const DateTimeControlGroup = <DynamicControlGroup<TimesheetCriteria>>{ name: "dateRange", 
    type: "group", controls: [
        <DynamicControl<DateRange>>{ name: "start",
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
        <DynamicControl<DateRange>>{ name: "end",
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
const StatusControl = <DynamicControl<TimesheetCriteria>>{ name: "status",
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
        UserControl,
        MissionControl,
        DateRangePresetControl,
        DateTimeControlGroup,
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