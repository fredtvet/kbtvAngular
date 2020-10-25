import { Timesheet } from 'src/app/core/models';
import { BaseFormToSaveModelStateCommandAdapter } from 'src/app/core/services/model/abstracts/base-form-to-save-model-state-command.adapter';
import { SaveModelStateCommand } from 'src/app/core/services/model/state/save-model/save-model-state-command.interface';
import { TimesheetForm } from 'src/app/shared/constants/model-forms/save-user-timesheet-form.const';
import { ModelFormToSaveModelInput } from 'src/app/shared/model-form';
import { SaveUserTimesheetAction } from '../save-user-timesheet/save-user-timesheet-state-command.interface';

export class UserTimesheetFormToSaveModelAdapter extends BaseFormToSaveModelStateCommandAdapter<Timesheet, TimesheetForm>
    implements SaveModelStateCommand<Timesheet>{

    action: string = SaveUserTimesheetAction;
    
    constructor(input:  ModelFormToSaveModelInput<TimesheetForm>){
        super(input);
    }

    protected convertFormStateToEntity(): void{
        const formState = this.input.formState;
        this.entity = {
            id: formState.id,
            missionId: formState.mission.id,
            comment: formState.comment,
            startTime: this.mergeDateAndTime(formState.date, formState.startTime).getTime(),
            endTime:  this.mergeDateAndTime(formState.date, formState.endTime).getTime(),
        };   
    }

    private mergeDateAndTime(date: any, time:any): Date{
        const d = new Date(date);
        const t = new Date(time);
        d.setHours(t.getHours(), t.getMinutes(), t.getSeconds());
        return d;
    }
}