import { StateCurrentUser, StateUserTimesheets } from '@core/state/global-state.interfaces';
import { _getTotalHours } from 'date-time-helpers';
import { SaveModelReducer } from 'model-state';
import { TimesheetStatus } from '@shared/enums';
import { _createReducer } from 'state-management'
import { Immutable } from 'global-types';
import { Timesheet } from '@core/models';
import { SaveUserTimesheetAction } from '@actions/timesheet-actions';

export const SaveUserTimesheetReducer = _createReducer(
    SaveUserTimesheetAction,
    (state: Immutable<StateCurrentUser & StateUserTimesheets>, action: Immutable<SaveUserTimesheetAction>) => { 
        
        const timesheet = action.entity;
        if(!action.entity) return;
        const modifiedTimesheet: Immutable<Timesheet> = {...timesheet,
                status: TimesheetStatus.Open,
                userName: state?.currentUser?.userName,
                totalHours: _getTotalHours(timesheet.startTime || 0, timesheet.endTime || 0)
            };

        return SaveModelReducer.reducerFn(state, <Immutable<SaveUserTimesheetAction>>{...action, entity: modifiedTimesheet})
    }
)