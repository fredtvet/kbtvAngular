import { Validators } from '@angular/forms';
import { Mission } from 'src/app/core/models';
import { DynamicControlGroup, DynamicControl, DynamicForm } from 'src/app/dynamic-forms/interfaces';
import { _getISO } from 'src/app/shared-app/helpers/datetime/get-iso-with-timezone.helper';
import { StateMissions } from 'src/app/state/interfaces';
import { IonDateQuestionComponent, IonDateQuestion } from '../../components/dynamic-form-questions/ion-date-time-question.component';
import { TextAreaQuestionComponent, TextAreaQuestion } from '../../components/dynamic-form-questions/text-area-question.component';
import { SaveModelFormState } from '../../model-form';
import { HiddenIdControl, MissionAutoCompleteControl } from '../common-controls.const';

type FormState = SaveModelFormState<StateMissions> & {defaultStartTime: string, defaultEndTime: string};

const _timeValueDefault = (date: number, hours: number = 0, minutes: number = 0): string => 
    new Date((date ? new Date(date) : new Date).getFullYear(), 1, 1, hours, minutes, 0).toISOString();

export interface TimesheetForm {
    id?: string;
    date?: number;
    mission?: Mission;
    startTime?: string;
    endTime?: string;
    comment?: string;
}

const DateTimeControlGroup = <DynamicControlGroup<TimesheetForm>>{ type: "group", controls: [
    <DynamicControl<TimesheetForm, any>>{ name: "date", required: true, 
        valueGetter: (s: TimesheetForm) => _getISO(s.date) || _getISO(s.startTime),
        getRawValue:true,
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
    <DynamicControl<TimesheetForm, any>>{ name: "startTime", required: true,
        valueGetter: (f: TimesheetForm) => _getISO(f?.startTime),
        type: "control", questions: [{
            component:  IonDateQuestionComponent,
            question: <IonDateQuestion>{
                placeholder: "Starttid", 
                width: "20%",
                ionFormat:"HH:mm",
                datePipeFormat: "HH:mm",
                minuteValues: [0,15,30,45],
                defaultValueGetter:  (f: TimesheetForm) => _timeValueDefault(f?.date, 7),
                max: {controlName: "endTime", callback: (val: any) => val}
            }, 
        }], 
    },
    <DynamicControl<TimesheetForm, any>>{ name: "endTime", required: true,
        valueGetter: (f: TimesheetForm) => _getISO(f?.endTime),
        type: "control", questions: [{
            component:  IonDateQuestionComponent,
            question: <IonDateQuestion>{
                placeholder: "Sluttid", 
                width: "20%",
                ionFormat:"HH:mm",
                datePipeFormat: "HH:mm",
                minuteValues: [0,15,30,45],  
                defaultValueGetter:  (f: TimesheetForm) => _timeValueDefault(f.date, 12),          
                min: {controlName: "startTime", callback: (val: any) => val}
            }, 
        }], 
    },
]}
const CommentControl = <DynamicControl<TimesheetForm, any>>{ name: "comment", required: true,
    type: "control", valueGetter: (s: TimesheetForm) => s?.comment, questions: [{
        component:  TextAreaQuestionComponent,
        question: <TextAreaQuestion>{placeholder: "Kommentar"}, 
    }], 
    validators: [Validators.maxLength(400)], 
}

export const CreateUserTimesheetForm: DynamicForm<TimesheetForm, FormState> = {
    submitText: "Legg til", getRawValue: true,
    controls: [
        {...MissionAutoCompleteControl, required: true},
        DateTimeControlGroup,
        CommentControl,
    ]
}
export const EditUserTimesheetForm: DynamicForm<TimesheetForm, FormState> = {
    submitText: "Oppdater", getRawValue: true,
    controls: [
        ...CreateUserTimesheetForm.controls,
        HiddenIdControl,
    ],
}