import { SaveUserTimesheetAction } from '@actions/timesheet-actions';
import { Timesheet } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { TimesheetForm } from '@shared/constants/model-forms/save-user-timesheet-form.const';
import { _mergeDateAndTime } from 'date-time-helpers';
import { Immutable } from 'global-types';
import { Converter, ModelFormResult } from 'model/form';

export const _timesheetFormToSaveUserTimesheetConverter: Converter<ModelFormResult<TimesheetForm, ModelState>, SaveUserTimesheetAction> =
    (input) => {      
        const {id, mission, comment, dateTime} = input.formValue;

        var entity: Immutable<Timesheet> = {
            id, comment, missionId: mission?.id,         
            startTime: dateTime!.startTime ? _mergeDateAndTime(dateTime!.date, dateTime!.startTime).getTime() : undefined,
            endTime:  dateTime!.endTime ? _mergeDateAndTime(dateTime!.date, dateTime!.endTime).getTime() : undefined,
        }; 

        entity = _modelIdGenerator<Timesheet>(input.stateProp, entity); 

        return <SaveUserTimesheetAction>{ 
            type: SaveUserTimesheetAction, entity, 
            stateProp: "userTimesheets",
            saveAction: input.saveAction
        }
    }
