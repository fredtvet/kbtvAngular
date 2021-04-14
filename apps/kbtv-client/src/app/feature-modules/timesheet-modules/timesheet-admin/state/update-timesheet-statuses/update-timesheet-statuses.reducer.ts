
import { _addOrUpdateRange } from 'array-helpers';
import { StateTimesheets } from '@core/state/global-state.interfaces';
import { _createReducer } from 'state-management'
import { Immutable } from 'global-types';
import { UpdateTimesheetStatusesAction } from '@actions/timesheet-actions';

export const UpdateTimesheetStatusesReducer = _createReducer(
    UpdateTimesheetStatusesAction, 
    (state: Immutable<StateTimesheets>, action: Immutable<UpdateTimesheetStatusesAction>): Immutable<StateTimesheets> => {
        const updatedTimesheets = action.ids.map(id => { return {id, status: action.status} });
        return {timesheets: _addOrUpdateRange(state.timesheets, updatedTimesheets, "id")}  
    }
)