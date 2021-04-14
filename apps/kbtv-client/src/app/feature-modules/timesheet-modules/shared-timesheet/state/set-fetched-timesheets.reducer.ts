import { SetFetchedTimesheetsAction } from '@actions/timesheet-actions';
import { StateMissions, StateTimesheets } from '@core/state/global-state.interfaces';
import { _addOrUpdateRange } from 'array-helpers';
import { Immutable } from 'global-types';
import { _createReducer } from 'state-management';
import { StateIsFetching } from 'model-state';

type State = Immutable<StateTimesheets & StateMissions & StateIsFetching<StateTimesheets>>;

export const SetFetchedTimesheetsReducer = _createReducer(
    SetFetchedTimesheetsAction,
    (state: State, action: Immutable<SetFetchedTimesheetsAction>) => {
        return <StateIsFetching<StateTimesheets>>{
            timesheets: _addOrUpdateRange(state.timesheets, action.timesheets, "id"),
            isFetching: {...state.isFetching || {}, timesheets: false}
        };
    }
)  
