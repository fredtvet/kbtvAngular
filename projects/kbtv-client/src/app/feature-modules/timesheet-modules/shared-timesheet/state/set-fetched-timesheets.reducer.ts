import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { Timesheet } from '@core/models';
import { StateMissions, StateTimesheets } from '@core/state/global-state.interfaces';
import { Immutable } from 'global-types';
import { _getRangeWithRelations } from '@model/helpers/get-range-with-relations.helper';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { StateAction } from '@state/state.action';

export const SetFetchedTimesheetsAction = "SET_FETCHED_TIMESHEETS_ACTION";
export interface SetFetchedTimesheetsAction extends StateAction {
    timesheets: Timesheet[]
}

type State = Immutable<StateTimesheets & StateMissions>;

export const SetFetchedTimesheetsReducer = _createReducer(
    SetFetchedTimesheetsAction,
    (state: State, action: Immutable<SetFetchedTimesheetsAction>) => {
        
        const timesheets = _getRangeWithRelations<Timesheet, State>({
            timesheets: action.timesheets, 
            missions: state.missions
        }, {prop: "timesheets", foreigns: ["missions"]});

        return {timesheets: _addOrUpdateRange<Timesheet>(state.timesheets, timesheets, "id")};
    }
)  
