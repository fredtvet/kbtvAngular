import { ModelFile } from "@core/models";
import { Immutable } from "global-types";
import { MapFn, StateDbConfig } from 'state-db';

const modelFileArrayMapper: MapFn<ModelFile[]> = 
    (x: Immutable<ModelFile[]>) => x?.map(({localFileUrl, ...rest} ) => rest);

export const AppStateDbConfig: StateDbConfig<unknown> = {
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