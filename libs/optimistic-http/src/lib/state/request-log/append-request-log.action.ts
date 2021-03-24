import { StateAction } from 'state-management'
import { CompletedCommand } from '../../interfaces';

export const AppendRequestLogAction = "APPEND_REQUEST_LOG_ACTION";
export interface AppendRequestLogAction<TOptions = {}> extends StateAction {
    completedCommands: CompletedCommand<TOptions>[];
}