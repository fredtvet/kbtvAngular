import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { _getTotalHours } from '@datetime/get-total-hours.helper';
import { SaveModelReducer } from '@model/state/save-model/save-model.reducer';
import { TimesheetStatus } from '@shared/enums';
import { Reducer } from '@state/interfaces';
import { SaveUserTimesheetAction } from './save-user-timesheet.action'

export const SaveUserTimesheetReducer: Reducer<StateCurrentUser, SaveUserTimesheetAction> = {
    action: SaveUserTimesheetAction,
    reducerFn: _reducerFn,
    stateProperties: (action:  any) => ["currentUser", ...(<Function>SaveModelReducer.stateProperties)(action)],   
}

function _reducerFn(state: any, action: SaveUserTimesheetAction): Partial<any>{ 
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