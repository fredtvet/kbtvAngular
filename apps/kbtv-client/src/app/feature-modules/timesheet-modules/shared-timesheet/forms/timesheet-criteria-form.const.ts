import { StateMissions, StateUsers } from '@core/state/global-state.interfaces';
import { DateRangePresets } from '@shared-app/enums/date-range-presets.enum';
import { translations } from '@shared-app/constants/translations.const';
import { TimesheetCriteria } from '@shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { MissionAutoCompleteControl, UserSelectControl } from '@shared/constants/common-controls.const';
import { TimesheetStatus } from '@shared-app/enums/timesheet-status.enum';
import { IonDateQuestionComponent, IonDateQuestion } from '@shared/scam/dynamic-form-questions/ion-date-time-question.component';
import { RadioGroupQuestion, RadioGroupQuestionComponent } from '@shared/scam/dynamic-form-questions/radio-group-question.component';
import { DateRange, _getISO, _getMonthRange } from 'date-time-helpers';
import { DynamicControl, DynamicControlGroup, DynamicForm, _formStateBinding, _formStateSetter } from 'dynamic-forms';
import { FormSheetViewConfig } from 'form-sheet';
import { Immutable, Maybe, NotNull } from 'global-types';
import { Converter } from 'model/form';
import { StateSyncConfig } from 'state-sync';
import { DeepPartial } from 'ts-essentials';

export const _criteriaFormToTimesheetCriteria : Converter<UserTimesheetCriteriaForm, TimesheetCriteria> =
    ({customMonthISO, ...rest}) => {
        if(customMonthISO && rest.dateRangePreset === DateRangePresets.CustomMonth)
            rest.dateRange = _getMonthRange(customMonthISO, true);
            
        return <TimesheetCriteria> rest
    } 

export const _timesheetCriteriaToForm : Converter<TimesheetCriteria, DeepPartial<UserTimesheetCriteriaForm>> =
    ({dateRange, ...rest}) => {        
        return {
            ...rest,
            dateRange: !dateRange ? undefined : {
                start: dateRange.start ? _getISO(dateRange.start) : undefined, 
                end: dateRange.end ? _getISO(dateRange.end) : undefined, 
            },
            customMonthISO: (dateRange && rest.dateRangePreset === DateRangePresets.CustomMonth) ? 
                _getISO(dateRange.start) : null
        }
    }

export type TimesheetCriteriaFormState = StateUsers & StateMissions & { startMax: string, startMin: string, endMax: string, endMin: string }

export interface TimesheetCriteriaForm extends UserTimesheetCriteriaForm, NotNull<Pick<TimesheetCriteria, "user">> {};

export interface UserTimesheetCriteriaForm extends NotNull<Pick<TimesheetCriteria, "dateRange" | "dateRangePreset" | "status" | "mission">> {
    customMonthISO: Maybe<string>;
};

export type UserTimesheetCriteriaFormState = TimesheetCriteriaFormState & StateSyncConfig;

type FormState = TimesheetCriteriaFormState;  

const DateRangePresetControl: Immutable<DynamicControl<DateRangePresets, null, RadioGroupQuestion<DateRangePresets, null>>> = { 
    required: true, questionComponent: RadioGroupQuestionComponent,
    question: {   
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
const CustomMonthControl: Immutable<DynamicControl<Maybe<string>, null, IonDateQuestion<TimesheetCriteriaForm>>> = { 
    panelClass: "mt-0",
    questionComponent:  IonDateQuestionComponent,        
    question: {
        placeholder: "Måned", 
        width: "50%",
        ionFormat:"YYYY-MMMM",
        datePipeFormat: "MMMM, y",                     
    }, 
}
const StatusControl: Immutable<DynamicControl<TimesheetStatus, null, RadioGroupQuestion<TimesheetStatus, null>>> = { 
    questionComponent:  RadioGroupQuestionComponent,
    question: {   
        label: "Velg status", defaultOption: "Begge",
        valueFormatter: (val) => translations[TimesheetStatus[val]?.toLowerCase()],
        stateBindings: {
            options: [TimesheetStatus.Open, TimesheetStatus.Confirmed], 
        }   
    }, 
}

const BaseForm: Immutable<Partial<DynamicForm<TimesheetCriteriaForm, FormState>>> = {
    submitText: "Bruk", resettable: true,
    hideOnValueChangeMap: {
        customMonthISO: (val) => val.dateRangePreset !== DateRangePresets.CustomMonth,
        dateRange: (val) => val.dateRangePreset !== DateRangePresets.Custom,
    },
}

export const UserTimesheetCriteriaForm: Immutable<DynamicForm<UserTimesheetCriteriaForm, UserTimesheetCriteriaFormState>> = {
    ...BaseForm,
    controls: {
        mission: {...MissionAutoCompleteControl, required: false},
        dateRangePreset: DateRangePresetControl,
        dateRange: CustomDateRangeControlGroup,
        customMonthISO: CustomMonthControl,
        status: StatusControl,
    },
    formStateSetters: [
        _formStateSetter<TimesheetCriteriaForm, UserTimesheetCriteriaFormState>()(["dateRange.start"], ["syncConfig"], (f,s) => { 
            return { endMin: <string> f['dateRange.start'] || (s.syncConfig?.initialTimestamp ? _getISO(s.syncConfig.initialTimestamp) : undefined) } 
        }), 
        _formStateSetter<TimesheetCriteriaForm, UserTimesheetCriteriaFormState>()([], ["syncConfig"], (f,s) => { 
            return { startMin: s.syncConfig?.initialTimestamp ? _getISO(s.syncConfig.initialTimestamp) : undefined } 
        }),
        _formStateSetter<TimesheetCriteriaForm, UserTimesheetCriteriaFormState>()(["dateRange.end"], [], (f) => { 
            return { startMax: <string> f['dateRange.end'] } 
        }),
    ]
}

export const UserTimesheetCriteriaFormSheet: Immutable<FormSheetViewConfig<UserTimesheetCriteriaForm, UserTimesheetCriteriaFormState>> = {
    formConfig: UserTimesheetCriteriaForm, 
    navConfig: {title: "Velg filtre"},
}

export const TimesheetCriteriaForm: Immutable<DynamicForm<TimesheetCriteriaForm, TimesheetCriteriaFormState>> = {
    ...BaseForm, options: { onlineRequired: true },
    controls: {
        user: UserSelectControl,
        mission: {...MissionAutoCompleteControl, required: false},
        dateRangePreset: DateRangePresetControl,
        dateRange: CustomDateRangeControlGroup,
        customMonthISO: CustomMonthControl,
        status: StatusControl,
    },
    formStateSetters: [
        _formStateSetter<TimesheetCriteriaForm, FormState>()(["dateRange.start"], [], (f) => { return { endMin: <string> f['dateRange.start'] } }),
        _formStateSetter<TimesheetCriteriaForm, FormState>()(["dateRange.end"], [], (f) => { return { startMax: <string> f['dateRange.end'] } })
    ]
}

export const TimesheetCriteriaFormSheet: Immutable<FormSheetViewConfig<TimesheetCriteriaForm, TimesheetCriteriaFormState>> = {
    formConfig: TimesheetCriteriaForm, 
    navConfig: {title: "Velg filtre"},
}
