import { ModelState } from "@core/state/model-state.interface";
import { ValidModelIdKey, ValidStateModelArray } from "../../../../../../../libs/model/model-core/src/lib/interfaces";

export const ModelIdProps: {[key in keyof ModelState]: ModelState[key] extends ValidStateModelArray<(infer M)> ? ValidModelIdKey<M> : never } = {
    missions: "id",
    employers: 'id',
    missionDocuments: 'id',
    missionImages: 'id',
    missionNotes: 'id',
    missionTypes: 'id',
    timesheets: 'id',
    userTimesheets: 'id',
    inboundEmailPasswords: 'id',
    users: 'userName',    
}