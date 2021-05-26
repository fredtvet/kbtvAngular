import { ModelFile } from "../models/base-entity-file.interface";
import { Immutable } from "global-types";
import { MapFn, StateDbConfig } from 'state-db';
import { StateMissions, StateMissionDocuments, StateMissionImages, StateMissionNotes, StateMissionTypes, StateEmployers, StateUserTimesheets, StateLeaderSettings, StateCurrentUser } from "@core/state/global-state.interfaces";
import { StateRequestQueue } from "optimistic-http";
import { StoreState } from "state-auth";
import { StateSyncConfig, StateSyncTimestamp } from "state-sync";

const modelFileArrayMapper: MapFn<ModelFile[]> = 
    (x: Immutable<ModelFile[]>) => x?.map(({localFileUrl, ...rest} ) => rest);

type PersistedState = StateMissions & StateMissionDocuments & StateMissionImages & StateMissionNotes & 
    StateMissionTypes & StateEmployers & StateUserTimesheets  & StateLeaderSettings & StateRequestQueue &
    StoreState & StateCurrentUser & StateSyncConfig & StateSyncTimestamp

export const AppStateDbConfig: StateDbConfig<PersistedState> = {
    missions: { storageType: "idb-keyval", onPersistMapping: modelFileArrayMapper },
    missionDocuments: { storageType: "idb-keyval", onPersistMapping: modelFileArrayMapper },
    missionImages: { storageType: "idb-keyval", onPersistMapping: modelFileArrayMapper },
    missionNotes: { storageType: "idb-keyval" },
    missionTypes: { storageType: "idb-keyval" },
    employers: { storageType: "idb-keyval" },
    userTimesheets: { storageType: "idb-keyval" },
    requestQueue: { storageType: "idb-keyval" },
    leaderSettings: { storageType: "idb-keyval" },
    accessToken: { storageType: "localStorage" },
    accessTokenExpiration: { storageType: "localStorage" },
    refreshToken: { storageType: "localStorage" },
    currentUser: { storageType: "localStorage" },       
    syncTimestamp: { storageType: "localStorage" },
    syncConfig: { storageType: "localStorage" }, 
}