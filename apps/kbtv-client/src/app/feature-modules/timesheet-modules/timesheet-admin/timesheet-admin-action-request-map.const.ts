import { ApiUrl } from "@core/api-url.enum";
import { GenericActionRequestMap } from "@core/configurations/optimistic/generic-action-request-map.const";
import { UpdateTimesheetStatusesRequest } from "@core/configurations/model/model-requests.interface";
import { Model } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { Immutable } from "global-types";
import { DeleteModelAction, SetSaveModelStateAction } from "model/state-commands";
import { ActionRequestMap } from "optimistic-http";
import { UpdateTimesheetStatusesAction } from "./state/actions.const";
import { _idGenerator } from "@shared-app/helpers/id/id-generator.helper";

export const TimesheetAdminActionRequestMap: ActionRequestMap<UpdateTimesheetStatusesAction | SetSaveModelStateAction<ModelState, Model> | DeleteModelAction<ModelState, Model>> = {
    [UpdateTimesheetStatusesAction]: (command: Immutable<UpdateTimesheetStatusesAction>) => {
        return <UpdateTimesheetStatusesRequest> {
            method: "PUT", 
            body: {ids: command.ids, status: command.status}, 
            apiUrl: `${ApiUrl.Timesheet}/Status`,
            headers: { commandId: _idGenerator(4) }
        }
    },
    [SetSaveModelStateAction]: GenericActionRequestMap[SetSaveModelStateAction],  
    [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction]
}