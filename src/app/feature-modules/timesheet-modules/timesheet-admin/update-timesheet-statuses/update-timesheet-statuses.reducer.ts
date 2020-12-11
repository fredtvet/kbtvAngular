
import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { StateTimesheets } from '@core/state/global-state.interfaces';
import { Reducer } from '@state/interfaces';
import { UpdateTimesheetStatusesAction } from './update-timesheet-statuses.action';

export const UpdateTimesheetStatusesReducer: Reducer<StateTimesheets, UpdateTimesheetStatusesAction> = {
    action: UpdateTimesheetStatusesAction, 
    stateProperties: ["timesheets"], 
    noDeepCloneState: true,
    reducerFn: (state: Readonly<StateTimesheets>, action: UpdateTimesheetStatusesAction): StateTimesheets => {
        const updatedTimesheets = action.ids.map(id => { return {id, status: action.status} });
        return {timesheets: _addOrUpdateRange(state.timesheets, updatedTimesheets, "id")}  
    }
}