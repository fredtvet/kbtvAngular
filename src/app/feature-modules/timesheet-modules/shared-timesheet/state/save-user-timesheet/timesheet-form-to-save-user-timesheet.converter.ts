import { Timesheet } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _mergeDateAndTime } from '@datetime/merge-date-and-time.helper';
import { FormToSaveModelConverter, ModelFormToSaveModelInput } from '@model-form/interfaces';
import { _flattenExistingForeigns } from '@shared-app/helpers/flatten-existing-foreigns.helper';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { TimesheetForm } from '@shared/constants/model-forms/save-user-timesheet-form.const';
import { SaveUserTimesheetAction } from './save-user-timesheet.action';

export const _timesheetFormToSaveUserTimesheetConverter: FormToSaveModelConverter<TimesheetForm, ModelState, SaveUserTimesheetAction> =
    (input: ModelFormToSaveModelInput<TimesheetForm, ModelState>): SaveUserTimesheetAction => {
        const value = input.formValue;

        var entity: Timesheet = {
            id: value.id,
            missionId: value.mission.id,
            comment: value.comment,
            startTime: _mergeDateAndTime(value.date, value.startTime).getTime(),
            endTime:  _mergeDateAndTime(value.date, value.endTime).getTime(),
        }; 

        entity = _flattenExistingForeigns<Timesheet>(input.stateProp, entity, input.options);
        entity = _modelIdGenerator(input.stateProp, entity); 

        return new SaveUserTimesheetAction(entity, input.saveAction)
    }
