import { Validators } from '@angular/forms';
import { Mission, Timesheet } from '@core/models';
import { StateMissions, UserTimesheet } from '@core/state/global-state.interfaces';
import { ModelState } from '@core/state/model-state.interface';
import { _timesheetFormToSaveModelConverter } from '@shared/action-converters/timesheet-form-to-save-model.converter';
import { _getISO } from 'date-time-helpers';
import { DynamicControl, DynamicControlGroup } from 'dynamic-forms';
import { Immutable, Maybe } from 'global-types';
import { Converter, ModelFormConfig, ModelFormState } from 'model/form';
import { IonDateQuestion, IonDateQuestionComponent } from '../../scam/dynamic-form-questions/ion-date-time-question.component';
import { TextAreaQuestion, TextAreaQuestionComponent } from '../../scam/dynamic-form-questions/text-area-question.component';
import { HiddenIdControl, MissionAutoCompleteControl } from '../common-controls.const';

type FormState = ModelFormState<StateMissions> & {defaultStartTime: string, defaultEndTime: string};

interface TimesheetDateTime { startTime?: string; endTime?: string; date?: string; }
export interface TimesheetForm {
    id?: string;    
    mission?: Maybe<Mission>;  
    dateTime?: TimesheetDateTime
    comment?: string;
}

const _timeValueDefault = (date: Maybe<string>, hours: number = 0, minutes: number = 0): string => 
    new Date((date ? new Date(date) : new Date).getFullYear(), 1, 1, hours, minutes, 0).toISOString();

const _modelToForm: Converter<Timesheet, TimesheetForm> = 
    ({id, mission, startTime, endTime, comment}) => {
        const d = {id, mission, comment, dateTime: {
            startTime: startTime ? _getISO(startTime) : undefined, 
            endTime: endTime ? _getISO(endTime) : undefined,
            date: startTime ? _getISO(startTime) : undefined
        }}
        return {id, mission, comment, dateTime: {
            startTime: startTime ? _getISO(startTime) : undefined, 
            endTime: endTime ? _getISO(endTime) : undefined,
            date: startTime ? _getISO(startTime) : undefined
    }}};
    
const DateTimeControlGroup: Immutable<DynamicControlGroup<{dateTime?: TimesheetDateTime}, "dateTime", FormState>> = { 
    type: "group", name: "dateTime", panelClass: "date-time-question-group",
    controls: {
        date: { type: "control", name: "date", required: true,     
            questionComponent: IonDateQuestionComponent, 
            question: <IonDateQuestion<{dateTime?: TimesheetDateTime}>>{
                placeholder: "Dato", 
                width: "42%",
                ionFormat:"YYYY-MMMM-DD",
                datePipeFormat: "MMM d, y",
            }, 
        },
        startTime: { type: "control", name: "startTime", required: true,
            questionComponent: IonDateQuestionComponent,
            question: <IonDateQuestion<{dateTime?: TimesheetDateTime}>>{
                placeholder: "Starttid", 
                width: "20%",
                ionFormat:"HH:mm",
                datePipeFormat: "HH:mm",
                minuteValues: [0,15,30,45],
                defaultValueGetter:  (f) => _timeValueDefault(f?.dateTime?.date, 7),
                max: {
                    controlName: "endTime", 
                    callback: (val: number) => val ? new Date(new Date(val).getTime() - 60e4).toLocaleTimeString() : null               
                }
            },  
        },
        endTime: { type: "control", name: "endTime", required: true,          
            questionComponent: IonDateQuestionComponent, 
            question: <IonDateQuestion<{dateTime?: TimesheetDateTime}>>{
                placeholder: "Sluttid", 
                width: "20%",
                ionFormat:"HH:mm",
                datePipeFormat: "HH:mm",
                minuteValues: [0,15,30,45],         
                min: {
                    controlName: "startTime", 
                    callback: (val: number) => val ? new Date(new Date(val).getTime() + 60e4).toLocaleTimeString() : null
                }
            }, 
        },
    }
}

const CommentControl: Immutable<DynamicControl<{comment?: string}, "comment">> = { 
    type: "control",  name: "comment", required: true, 
    questionComponent: TextAreaQuestionComponent,
    question: <TextAreaQuestion>{ placeholder: "Kommentar", rows: 3 },
    validators: [Validators.maxLength(400)], 
}

export const CreateUserTimesheetModelForm: Immutable<ModelFormConfig<ModelState, UserTimesheet, TimesheetForm, FormState>> = {
    includes: {prop: "userTimesheets", foreigns: "all"}, 
    actionConverter: _timesheetFormToSaveModelConverter,
    dynamicForm: {
        submitText: "Legg til", getRawValue: true,   
        controls: {
            mission: {...MissionAutoCompleteControl, required: true},
            dateTime: DateTimeControlGroup,
            comment: CommentControl,
        }
    }
}

export const EditUserTimesheetModelForm: Immutable<ModelFormConfig<ModelState, UserTimesheet, TimesheetForm, FormState>> = {
    includes: {prop: "userTimesheets", foreigns: "all"},
    actionConverter: _timesheetFormToSaveModelConverter,
    modelConverter: _modelToForm,
    dynamicForm: {
        submitText: "Oppdater", getRawValue: true,
        controls: {
            mission: {...MissionAutoCompleteControl, required: true},
            dateTime: DateTimeControlGroup,
            comment: CommentControl,
            id: HiddenIdControl,
        },
    }
}