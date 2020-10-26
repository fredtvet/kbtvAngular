import { Validators } from '@angular/forms';
import { Mission } from 'src/app/core/models';
import { _getISO } from 'src/app/shared-app/helpers/datetime/get-iso-with-timezone.helper';
import { DynamicControl, DynamicControlGroup, DynamicForm } from '../../dynamic-form/interfaces';
import { AutoCompleteQuestionComponent } from '../../dynamic-form/questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../dynamic-form/questions/auto-complete-question/auto-complete-question.interface';
import { IonDateQuestionComponent, IonDateQuestion } from '../../dynamic-form/questions/ion-date-time-question.component';
import { TextAreaQuestionComponent, TextAreaQuestion } from '../../dynamic-form/questions/text-area-question.component';
import { isObjectValidator } from '../../form/validators/is-object.validator';
import { SaveModelFormState } from '../../model-form';

type FormState = SaveModelFormState & {defaultStartTime: string, defaultEndTime: string};

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

const MissionControl = <DynamicControl<TimesheetForm>>{ name: "mission", required: true,
    valueGetter: (s: TimesheetForm) => s.mission,
    type: "control", questions: [{
        component:  AutoCompleteQuestionComponent,
        question: <AutoCompleteQuestion<Mission>>{
            optionsGetter: (state: FormState) => state.foreigns.missions,
            placeholder: "Oppdrag",
            valueFormatter: (val: Mission) => val.address,
            displayWith: (mission: Mission) => mission ? mission.address : null,
            resetable: true,
            activeFilter: { stringProps: ["address"], maxChecks: 50 }
        }, 
    }],
    validators: [isObjectValidator()], 
}
const DateTimeControlGroup = <DynamicControlGroup<any>>{ type: "group", controls: [
    <DynamicControl<TimesheetForm>>{ name: "date", required: true, 
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
    <DynamicControl<TimesheetForm>>{ name: "startTime", required: true,
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
    <DynamicControl<TimesheetForm>>{ name: "endTime", required: true,
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
const CommentControl = <DynamicControl<TimesheetForm>>{ name: "comment", required: true,
    type: "control", questions: [{
        component:  TextAreaQuestionComponent,
        question: <TextAreaQuestion>{placeholder: "Kommentar"}, 
    }], 
    validators: [Validators.maxLength(400)], 
}
const IdControl = <DynamicControl<TimesheetForm>>{ name: "id", required: true,
    type: "control", valueGetter: (s: TimesheetForm) => s.id,          
}

export const CreateUserTimesheetForm: DynamicForm<TimesheetForm, FormState> = {
    submitText: "Legg til", getRawValue: true,
    controls: [
        MissionControl,
        DateTimeControlGroup,
        CommentControl,
    ]
}

export const EditUserTimesheetForm: DynamicForm<TimesheetForm, FormState> = {
    submitText: "Oppdater", getRawValue: true,
    controls: [
        MissionControl,
        DateTimeControlGroup,
        {...CommentControl, valueGetter: (s: TimesheetForm) => s.comment},
        IdControl,
    ],
}