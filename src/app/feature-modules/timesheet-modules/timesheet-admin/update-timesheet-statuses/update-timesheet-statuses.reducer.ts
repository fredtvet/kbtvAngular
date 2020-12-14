
import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { StateTimesheets } from '@core/state/global-state.interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { UpdateTimesheetStatusesAction } from './update-timesheet-statuses.action';

export const UpdateTimesheetStatusesReducer = _createReducer(
    UpdateTimesheetStatusesAction, 
    (state: Immutable<StateTimesheets>, action: Immutable<UpdateTimesheetStatusesAction>): Immutable<StateTimesheets> => {
        const updatedTimesheets = action.ids.map(id => { return {id, status: action.status} });
        return {timesheets: _addOrUpdateRange(state.timesheets, updatedTimesheets, "id")}  
    }
)