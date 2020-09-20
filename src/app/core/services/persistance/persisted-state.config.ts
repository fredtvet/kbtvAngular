export const PersistedStateConfig:{[key: string]: boolean}  =
{
    missions: true,
    missionDocuments: true,
    missionImages: true,
    missionNotes: true,
    missionTypes: true,
    documentTypes: true,
    employers: true,
    userTimesheets: true,
    requestQueue: true
};  

export const PersistedInitialStateConfig:{[key: string]: boolean}  =
{
    accessToken: true,
    refreshToken: true,
    currentUser: true,       
    syncTimestamps: true,
    syncConfig:  true, 
};  