import { Timesheet } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { SaveModelStateCommand } from '@model/state/save-model/save-model-action.const';
import { TimesheetForm } from '@shared/constants/model-forms/save-user-timesheet-form.const';
import { BaseFormToSaveModelStateCommandAdapter } from '@shared/form-adapters/base-form-to-save-model-state-command.adapter';
import { ModelFormToSaveModelInput } from '@shared/model-form';
import { SaveUserTimesheetActionId } from './save-user-timesheet-command.interface';

export class UserTimesheetFormToSaveModelAdapter extends BaseFormToSaveModelStateCommandAdapter<Timesheet, TimesheetForm>
    implements SaveModelStateCommand<Timesheet, ModelState>{

    actionId: string = SaveUserTimesheetActionId;
    
    constructor(input:  ModelFormToSaveModelInput<TimesheetForm, ModelState>){
        super(input);
    }

    protected convertFormStateToEntity(): void{
        const formState = this.input.formValue;
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