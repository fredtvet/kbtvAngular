import { Timesheet } from '@core/models';
import { BaseFormToSaveModelStateCommandAdapter } from '@model/abstracts/base-form-to-save-model-state-command.adapter';
import { SaveModelStateCommand } from '@model/state/save-model/save-model-action.const';
import { TimesheetForm } from '@shared/constants/model-forms/save-user-timesheet-form.const';
import { ModelFormToSaveModelInput } from '@shared/model-form';
import { SaveUserTimesheetActionId } from './save-user-timesheet-command.interface';

export class UserTimesheetFormToSaveModelAdapter extends BaseFormToSaveModelStateCommandAdapter<Timesheet, TimesheetForm>
    implements SaveModelStateCommand<Timesheet>{

    actionId: string = SaveUserTimesheetActionId;
    
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