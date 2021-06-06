import { CommandIdHeader } from "@core/configurations/command-id-header.const";
import { UpdateTimesheetStatusesRequest } from "@core/configurations/model/model-requests.interface";
import { GenericActionRequestMap } from "@core/configurations/optimistic/generic-action-request-map.const";
import { Model } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { _idGenerator } from "@shared-app/helpers/id/id-generator.helper";
import { DeleteModelAction, SetSaveModelStateAction } from "model/state-commands";
import { ActionRequestMap } from "optimistic-http";
import { UpdateTimesheetStatusesAction } from "./state/actions.const";

export const TimesheetAdminActionRequestMap: ActionRequestMap<UpdateTimesheetStatusesAction | SetSaveModelStateAction<ModelState, Model> | DeleteModelAction<ModelState, Model>> = {
    [UpdateTimesheetStatusesAction]: (action): UpdateTimesheetStatusesRequest=> {
        return {
            method: "PUT", 
            body: {ids: action.ids, status: action.status}, 
            apiUrl: `/Timesheets/Status`,
            headers: { [CommandIdHeader]: _idGenerator(4) },
            type: UpdateTimesheetStatusesRequest
        }
    },
    [SetSaveModelStateAction]: GenericActionRequestMap[SetSaveModelStateAction],  
    [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction]
}