import { Timesheet } from '@core/models';
import { _getRangeWithRelations } from '@model/helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { Reducer } from '@state/interfaces';
import { StateTimesheets, StateMissions } from '@core/state/global-state.interfaces';
import { StateAction } from '@state/state.action';

export class SetFetchedTimesheetsAction extends StateAction {
    constructor(public timesheets: Timesheet[]){ super() };
}

type State = StateTimesheets & StateMissions;

export const SetFetchedTimesheetsReducer: Reducer<State, SetFetchedTimesheetsAction> = {
    action: SetFetchedTimesheetsAction,
    stateProperties: ["timesheets", "missions"],
    reducerFn: (state: State, action: SetFetchedTimesheetsAction) => {
        
        const relationCfg = new GetWithRelationsConfig("timesheets", null, ["missions"]);

        const timesheets = _getRangeWithRelations({
            timesheets: action.timesheets, 
            missions: state.missions
        }, relationCfg);

        state.timesheets = _addOrUpdateRange(state.timesheets, timesheets, "id");

        return state;
    }
        
}  
