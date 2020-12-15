import { StateCurrentUser, StateUserTimesheets } from '@core/state/global-state.interfaces';
import { _getTotalHours } from '@datetime/get-total-hours.helper';
import { SaveModelReducer } from '@model/state/save-model/save-model.reducer';
import { TimesheetStatus } from '@shared/enums';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { SaveUserTimesheetAction } from './save-user-timesheet.action';
import { Timesheet } from '@core/models';

export const SaveUserTimesheetReducer = _createReducer(
    SaveUserTimesheetAction,
    (state: Immutable<StateCurrentUser & StateUserTimesheets>, action: Immutable<SaveUserTimesheetAction>): 
    Partial<StateUserTimesheets> => { 
        
        const timesheet = action.entity;
        if(!action.entity) return null;
        const modifiedTimesheet: Immutable<Timesheet> = {...timesheet,
                status: TimesheetStatus.Open,
                userName: state?.currentUser?.userName,
                totalHours: _getTotalHours(timesheet.startTime, timesheet.endTime)
            };

        return <Partial<StateUserTimesheets>> SaveModelReducer.reducerFn(state, {...action, entity: modifiedTimesheet})
    }
)
