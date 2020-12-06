import { SaveModelReducer } from 'src/app/model/state/save-model/save-model.reducer';
import { _getTotalHours } from 'src/app/shared-app/helpers/datetime/get-total-hours.helper';
import { TimesheetStatus } from 'src/app/shared/enums';
import { Reducer, StateCurrentUser } from 'src/app/state/interfaces';
import { SaveUserTimesheetActionId, SaveUserTimesheetCommand } from './save-user-timesheet-command.interface';

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