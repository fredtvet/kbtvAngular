import { ModelFile } from "@core/models";
import { Immutable } from "@global/interfaces";
import { MapFn, PersistanceConfig } from "@persistance/interfaces";

const modelFileArrayMapper: MapFn<ModelFile[]> = 
    (x: Immutable<ModelFile[]>) => x.map(({localFileUrl, ...rest} ) => rest);

export const AppPersistanceConfig: PersistanceConfig<unknown> = {
    missions: { onPersistMapping: modelFileArrayMapper },
    missionDocuments: { onPersistMapping: modelFileArrayMapper },
    missionImages: { onPersistMapping: modelFileArrayMapper },
    missionNotes: {},
    missionTypes: {},
    documentTypes: {},
    employers: {},
    userTimesheets: {},
    requestQueue: {},
    accessToken: {critical: true},
    refreshToken: {critical: true},
    currentUser: {critical: true},       
    syncTimestamp: {critical: true},
    syncConfig: {critical: true}, 
}