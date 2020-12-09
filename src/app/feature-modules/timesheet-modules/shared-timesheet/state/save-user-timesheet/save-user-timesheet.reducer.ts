import { SaveModelReducer } from '@model/state/save-model/save-model.reducer';
import { _getTotalHours } from '@datetime/get-total-hours.helper';
import { TimesheetStatus } from '@shared/enums';
import { Reducer } from '@state/interfaces';
import { SaveUserTimesheetActionId, SaveUserTimesheetCommand } from './save-user-timesheet-command.interface';
import { StateCurrentUser } from '@core/state/global-state.interfaces';

export const SaveUserTimesheetReducer: Reducer<StateCurrentUser> = {
    actionId: SaveUserTimesheetActionId,
    reducerFn: _reducerFn,
    stateProperties: (action:  any) => ["currentUser", ...(<Function>SaveModelReducer.stateProperties)(action)],   
}

function _reducerFn(state: any, action: SaveUserTimesheetCommand): Partial<any>{ 
    let inputTimesheet = action.entity;
    let modifiedTimesheet = {};

    if(inputTimesheet)
        modifiedTimesheet = {...inputTimesheet,
            status: TimesheetStatus.Open,
            userName: state?.currentUser?.userName,
            totalHours: _getTotalHours(inputTimesheet.startTime,inputTimesheet.endTime)
        };
        
    action.entity = modifiedTimesheet;
    return SaveModelReducer.reducerFn(state, action)
}