import { CreateUserRequest, DeleteModelRangeRequest, DeleteModelRequest, SaveModelFileRequest, SaveModelRequest, UpdateCurrentUserRequest, UpdateTimesheetStatusesRequest } from "@core/configurations/model/model-requests.interface";
import { Model, ModelFile } from "@core/models";
import { _deleteModelRangeRequestDescriber } from "@shared-app/helpers/request-describers/delete-model-range-request-describer.helper";
import { _deleteModelRequestDescriber } from "@shared-app/helpers/request-describers/delete-model-request-describer.helper";
import { _saveModelRequestDescriber } from "@shared-app/helpers/request-describers/save-model-request-describer.helper";
import { RequestDescriberMap } from "@shared-app/interfaces/request-describer-map.interface";

type Requests = SaveModelRequest<Model> | SaveModelFileRequest<ModelFile> | DeleteModelRangeRequest<Model> | DeleteModelRequest<Model> |
    UpdateTimesheetStatusesRequest | CreateUserRequest | UpdateCurrentUserRequest;

export const AppRequestDescriberMap: RequestDescriberMap<Requests> = {
    SaveModelRequest: _saveModelRequestDescriber,
    SaveModelFileRequest: _saveModelRequestDescriber,
    DeleteModelRequest: _deleteModelRequestDescriber,
    DeleteModelRangeRequest: _deleteModelRangeRequestDescriber,
    CreateUserRequest: (req) => _saveModelRequestDescriber({...req, stateProp: "users"}),
    UpdateTimesheetStatusesRequest: (req) => `Oppdatering status for ${req.body.ids.length} timeregistreringer`,
    UpdateCurrentUserRequest: (req) => "Oppdatering av profil",
}