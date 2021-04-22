import { SaveUserTimesheetAction } from '@actions/timesheet-actions';
import { Timesheet } from '@core/models';
import { StateCurrentUser, StateUserTimesheets } from '@core/state/global-state.interfaces';
import { TimesheetStatus } from '@shared/enums';
import { _getTotalHours } from 'date-time-helpers';
import { Immutable } from 'global-types';
import { SaveModelAction, SaveModelReducer } from 'model/state-commands';
import { _createReducer } from 'state-management';

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

        return SaveModelReducer.reducerFn(state, {...action, type: SaveModelAction, entity: modifiedTimesheet})
    }
)