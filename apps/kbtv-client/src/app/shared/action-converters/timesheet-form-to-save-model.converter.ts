import { Timesheet } from '@core/models';
import { UserTimesheet } from '@core/state/global-state.interfaces';
import { ModelState } from '@core/state/model-state.interface';
import { TimesheetForm } from '@shared/constants/model-forms/save-user-timesheet-form.const';
import { TimesheetStatus } from '@shared/enums';
import { _getTotalHours, _mergeDateAndTime } from 'date-time-helpers';
import { Immutable } from 'global-types';
import { Converter, ModelFormResult } from 'model/form';
import { SaveModelAction } from 'model/state-commands';

export const _timesheetFormToSaveModelConverter: Converter<
    ModelFormResult<ModelState, Timesheet, TimesheetForm>, 
    SaveModelAction<ModelState, UserTimesheet>
> = (input) => {      
    const {id, mission, comment, dateTime} = input.formValue;

    var entity: Timesheet = {
        id, comment, missionId: mission?.id,    
        status: TimesheetStatus.Open,     
        startTime: dateTime!.startTime ? _mergeDateAndTime(dateTime!.date, dateTime!.startTime).getTime() : undefined,
        endTime:  dateTime!.endTime ? _mergeDateAndTime(dateTime!.date, dateTime!.endTime).getTime() : undefined,
    }; 
    
    entity.totalHours = _getTotalHours(entity.startTime || 0, entity.endTime || 0)

    return <Immutable<SaveModelAction<ModelState, UserTimesheet>>>{ 
        type: SaveModelAction,
        entity, 
        stateProp: "userTimesheets",
        saveAction: input.saveAction
    }
}
