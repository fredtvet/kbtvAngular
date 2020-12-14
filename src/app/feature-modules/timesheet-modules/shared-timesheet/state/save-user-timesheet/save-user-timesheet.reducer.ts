import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { _getTotalHours } from '@datetime/get-total-hours.helper';
import { SaveModelReducer } from '@model/state/save-model/save-model.reducer';
import { TimesheetStatus } from '@shared/enums';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { SaveUserTimesheetAction } from './save-user-timesheet.action';

export const SaveUserTimesheetReducer = _createReducer(
    SaveUserTimesheetAction,
    (state: Immutable<StateCurrentUser>, action: Immutable<SaveUserTimesheetAction>): Partial<any> => { 
        let timesheet = action.entity;
        let modifiedTimesheet;
    
        if(timesheet)
            modifiedTimesheet = {...timesheet,
                status: TimesheetStatus.Open,
                userName: state?.currentUser?.userName,
                totalHours: _getTotalHours(timesheet.startTime, timesheet.endTime)
            };

        return SaveModelReducer.reducerFn(state, {...action, entity: modifiedTimesheet})
    }
)
