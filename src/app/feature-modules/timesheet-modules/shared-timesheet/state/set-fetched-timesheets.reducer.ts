import { Timesheet } from '@core/models';
import { _getRangeWithRelations } from '@model/helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { Reducer, StateAction } from '@state/interfaces';
import { StateTimesheets, StateMissions } from '@core/state/global-state.interfaces';

export const SetFetchedTimesheetsActionId = "SET_FETCHED_TIMESHEETS";

export interface SetFetchedTimesheetsCommand extends StateAction {
    timesheets: Timesheet[];
}

type State = StateTimesheets & StateMissions;

export const SetFetchedTimesheetsReducer: Reducer<State, SetFetchedTimesheetsCommand> = {
    actionId: SetFetchedTimesheetsActionId,
    stateProperties: ["timesheets", "missions"],
    reducerFn: (state: State, action: SetFetchedTimesheetsCommand) => {
        
        const relationCfg = new GetWithRelationsConfig("timesheets", null, ["missions"]);

        const timesheets = _getRangeWithRelations({
            timesheets: action.timesheets, 
            missions: state.missions
        }, relationCfg);

        state.timesheets = _addOrUpdateRange(state.timesheets, timesheets, "id");

        return state;
    }
        
}  
