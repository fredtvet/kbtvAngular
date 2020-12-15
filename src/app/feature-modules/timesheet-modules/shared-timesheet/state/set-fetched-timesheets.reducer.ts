import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { Timesheet } from '@core/models';
import { StateMissions, StateTimesheets } from '@core/state/global-state.interfaces';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _getRangeWithRelations } from '@model/helpers/get-range-with-relations.helper';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StateAction } from '@state/state.action';

export const SetFetchedTimesheetsAction = "SET_FETCHED_TIMESHEETS_ACTION";
export interface SetFetchedTimesheetsAction extends StateAction {
    timesheets: Timesheet[]
}

type State = Immutable<StateTimesheets & StateMissions>;

export const SetFetchedTimesheetsReducer = _createReducer(
    SetFetchedTimesheetsAction,
    (state: State, action: Immutable<SetFetchedTimesheetsAction>): Partial<State> => {
        
        const relationCfg = new GetWithRelationsConfig<State>("timesheets", null, ["missions"]);

        const timesheets = _getRangeWithRelations<Timesheet, State>({
            timesheets: action.timesheets, 
            missions: state.missions
        }, relationCfg);

        return {timesheets: _addOrUpdateRange(state.timesheets, timesheets, "id")};
    }
)  
