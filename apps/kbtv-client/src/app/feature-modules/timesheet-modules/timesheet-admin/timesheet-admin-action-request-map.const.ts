import { UpdateTimesheetStatusesAction } from "@actions/timesheet-actions";
import { ApiUrl } from "@core/api-url.enum";
import { GenericActionRequestMap } from "@core/configurations/optimistic/generic-action-request-map.const";
import { Immutable } from "global-types";
import { SaveModelAction } from "model/state-commands";
import { ActionRequestMap } from "optimistic-http";

export const TimesheetAdminActionRequestMap: ActionRequestMap<typeof UpdateTimesheetStatusesAction | typeof SaveModelAction> = {
    [UpdateTimesheetStatusesAction]: (command: Immutable<UpdateTimesheetStatusesAction>) => {
        return {
            method: "PUT", 
            body: {ids: command.ids, status: command.status}, 
            apiUrl: `${ApiUrl.Timesheet}/Status`
        }
    },
    [SaveModelAction]: GenericActionRequestMap[SaveModelAction], 
}