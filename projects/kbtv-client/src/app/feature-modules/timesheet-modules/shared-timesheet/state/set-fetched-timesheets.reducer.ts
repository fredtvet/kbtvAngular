import { _addOrUpdateRange } from 'array-helpers';
import { Timesheet } from '@core/models';
import { StateMissions, StateTimesheets } from '@core/state/global-state.interfaces';
import { StateIsFetching, _getRangeWithRelations } from 'state-model';
import { Immutable } from 'global-types';
import { StateAction, _createReducer } from 'state-management';

export const SetFetchedTimesheetsAction = "SET_FETCHED_TIMESHEETS_ACTION";
export interface SetFetchedTimesheetsAction extends StateAction {
    timesheets: Timesheet[]
}

type State = Immutable<StateTimesheets & StateMissions & StateIsFetching<StateTimesheets>>;

export const SetFetchedTimesheetsReducer = _createReducer(
    SetFetchedTimesheetsAction,
    (state: State, action: Immutable<SetFetchedTimesheetsAction>) => {
        
        const timesheets = _getRangeWithRelations<Timesheet, State>({
            timesheets: action.timesheets, 
            missions: state.missions
        }, {prop: "timesheets", foreigns: ["missions"]});

        return {
            timesheets,
            fetchedModels: {...state.isFetching, timesheets: false}
        };
    }
)  
