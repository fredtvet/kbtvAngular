import { Validators } from '@angular/forms';
import { Mission } from '@core/models';
import { DynamicControl, DynamicControlGroup, DynamicForm } from 'dynamic-forms';
import { _getISO } from 'date-time-helpers';
import { IonDateQuestion, IonDateQuestionComponent } from '../../scam/dynamic-form-questions/ion-date-time-question.component';
import { TextAreaQuestion, TextAreaQuestionComponent } from '../../scam/dynamic-form-questions/text-area-question.component';
import { HiddenIdControl, MissionAutoCompleteControl } from '../common-controls.const';
import { StateMissions } from '@core/state/global-state.interfaces';
import { OptionsFormState } from 'form-sheet';
import { Immutable, Maybe } from 'global-types';
import { ModelFormConfig } from 'model/form';
import { ModelState } from '@core/state/model-state.interface';
import { _formToSaveModelConverter } from '@shared/acton-converters/form-to-save-model.converter';
import { _timesheetFormToSaveUserTimesheetConverter } from '@shared-timesheet/state/save-user-timesheet/timesheet-form-to-save-user-timesheet.converter';

type FormState = OptionsFormState<StateMissions> & {defaultStartTime: string, defaultEndTime: string};

const _timeValueDefault = (date: Maybe<number>, hours: number = 0, minutes: number = 0): string => 
    new Date((date ? new Date(date) : new Date).getFullYear(), 1, 1, hours, minutes, 0).toISOString();

export interface TimesheetForm {
    id?: string;
    date?: number;
    mission?: Mission;
    startTime?: string;
    endTime?: string;
    comment?: string;
}

const DateTimeControlGroup: Immutable<DynamicControlGroup<TimesheetForm, FormState>> = { type: "group", 
panelClass: "date-time-questino-group",
controls: [
    { name: "date", required: true, 
        valueGetter: (s: TimesheetForm) => s.date ? _getISO(s.date) : (s.startTime ? _getISO(s.startTime) : null),
        type: "control", questions: [{
            component:  IonDateQuestionComponent,
            question: <IonDateQuestion>{
                placeholder: "Dato", 
                width: "42%",
                ionFormat:"YYYY-MMMM-DD",
                datePipeFormat: "MMM d, y",
            }, 
        }], 
    } ,
    { name: "startTime", required: true,
        valueGetter: (f: TimesheetForm) => f.startTime ? _getISO(f.startTime) : null,
        type: "control", questions: [{
            component:  IonDateQuestionComponent,
            question: <IonDateQuestion>{
                placeholder: "Starttid", 
                width: "20%",
                ionFormat:"HH:mm",
                datePipeFormat: "HH:mm",
                minuteValues: [0,15,30,45],
                defaultValueGetter:  (f: TimesheetForm) => _timeValueDefault(f?.date, 7),
                max: {
                    controlName: "endTime", 
                    callback: (val: number) => val ? new Date(new Date(val).getTime() - 60e4).toLocaleTimeString() : null               
                }
            }, 
        }], 
    },
    { name: "endTime", required: true,
        valueGetter: (f: TimesheetForm) => f.endTime ? _getISO(f.endTime) : null,
        type: "control", questions: [{
            component:  IonDateQuestionComponent,
            question: <IonDateQuestion>{
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
        }], 
    },
]}

const CommentControl: Immutable<DynamicControl<TimesheetForm, FormState>> = { name: "comment", required: true,
    type: "control", valueGetter: (s: TimesheetForm) => s?.comment, questions: [{
        component:  TextAreaQuestionComponent,
        question: <TextAreaQuestion>{placeholder: "Kommentar", rows: 3}, 
    }], 
    validators: [Validators.maxLength(400)], 
}

export const CreateUserTimesheetModelForm: Immutable<ModelFormConfig<ModelState, TimesheetForm, FormState>> = {
    includes: {prop: "userTimesheets", foreigns: "all"},
    actionConverter: _timesheetFormToSaveUserTimesheetConverter,
    dynamicForm: {
        submitText: "Legg til", getRawValue: true,
        controls: [
            {...MissionAutoCompleteControl, required: true},
            DateTimeControlGroup,
            CommentControl,
        ]
    }
}

export const EditUserTimesheetModelForm: Immutable<ModelFormConfig<ModelState, TimesheetForm, FormState>> = {
    includes: {prop: "userTimesheets", foreigns: "all"},
    actionConverter: _timesheetFormToSaveUserTimesheetConverter,
    dynamicForm: {
        submitText: "Oppdater", getRawValue: true,
        controls: [
            ...CreateUserTimesheetModelForm.dynamicForm.controls,
            HiddenIdControl,
        ],
    }
}