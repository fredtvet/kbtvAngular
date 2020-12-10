
import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { StateTimesheets } from '@core/state/global-state.interfaces';
import { Reducer } from '@state/interfaces';
import { UpdateStatusesActionId, UpdateStatusesStateCommand } from './update-statuses-state-command.interface';

export const UpdateStatusesReducer: Reducer<StateTimesheets, UpdateStatusesStateCommand> = {
    actionId: UpdateStatusesActionId, stateProperties: ["timesheets"], noDeepCloneState: true,
    reducerFn: (state: Readonly<StateTimesheets>, action: UpdateStatusesStateCommand): StateTimesheets => {
        const updatedTimesheets = action.ids.map(id => { return {id, status: action.status} });
        return {timesheets: _addOrUpdateRange(state.timesheets, updatedTimesheets, "id")}  
    }
}