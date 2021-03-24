import { Reducer, _createReducer } from 'state-management';
import { StateRequestLog } from '../../interfaces';
import { AppendRequestLogAction } from './append-request-log.action';

export const AppendRequestLogReducer: Reducer<StateRequestLog, AppendRequestLogAction> = _createReducer(
    AppendRequestLogAction,
    (state, action) => { 
        return { requestLog: state.requestLog ? 
            [...action.completedCommands, ...state.requestLog] : 
            action.completedCommands
        }
    }
) 