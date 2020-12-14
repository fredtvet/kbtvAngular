import { PersistanceConfig } from "@persistance/interfaces";

export const AppPersistanceConfig: PersistanceConfig<any> = {
    missions: {enableTempData: true},
    missionDocuments: {enableTempData: true},
    missionImages: {enableTempData: true},
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