import { Timesheet } from '@core/models';
import { _getRangeWithRelations } from '@model/helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from '@model/helpers/get-with-relations.config';
import { _addOrUpdateRange } from '@shared-app/helpers/array/add-or-update-range.helper';
import { Reducer, StateAction, StateMissions, StateTimesheets } from '@state/interfaces';

export const SetFetchedTimesheetsActionId = "SET_FETCHED_TIMESHEETS";

export interface SetFetchedTimesheetsCommand extends StateAction {
    timesheets: Timesheet[];
}

type State = StateTimesheets & StateMissions;

export const SetFetchedTimesheetsReducer: Reducer<State> = {
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
