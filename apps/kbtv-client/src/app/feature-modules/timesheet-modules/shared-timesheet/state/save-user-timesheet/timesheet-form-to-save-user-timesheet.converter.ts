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
        const value = input.formValue;

        var entity: Immutable<Timesheet> = {
            id: value.id,
            missionId: value.mission?.id,
            comment: value.comment,
            startTime: value.startTime ? _mergeDateAndTime(value.date, value.startTime).getTime() : undefined,
            endTime:  value.endTime ? _mergeDateAndTime(value.date, value.endTime).getTime() : undefined,
        }; 

        entity = _modelIdGenerator<Timesheet>(input.stateProp, entity); 

        return <SaveUserTimesheetAction>{ 
            type: SaveUserTimesheetAction, entity, 
            stateProp: "userTimesheets",
            saveAction: input.saveAction
        }
    }
