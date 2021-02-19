import { CompletedCommand } from "../interfaces";
import { HttpErrorAction } from "./http-error/http-error.action";

export const OptimisticHttpErrorAction = "OPTIMISTIC_HTTP_ERROR_ACTION";

/** Represents an optimistic error containing both the triggering http error command & any canceled commands */
export interface OptimisticHttpErrorAction extends HttpErrorAction {
    canceledCommands: CompletedCommand[];
    errorCommand: CompletedCommand;
}