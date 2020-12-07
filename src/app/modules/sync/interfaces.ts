import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelState } from '@model/interfaces';
import { StateSyncConfig, StateCurrentUser } from '@state/interfaces';

export interface StoreState extends Partial<ModelState>,
    StateSyncConfig,
    StateCurrentUser
{
    syncConfig: SyncConfig
    syncTimestamps: SyncStoreTimestamps;
}

export type SyncStateConfig<TState> = {[key in keyof TState]: SyncStatePropConfig}

export interface SyncStatePropConfig {
    responseKey: string,
    requestKey: string,
    singular?: boolean,
    wipeable?: boolean
}

export interface SyncConfig{
    refreshTime?: number; 
    initialNumberOfMonths?: string;
}

export interface SyncResponse{
    [key: string]: EntitySyncResponse
}

export interface EntitySyncResponse{
    entities: Object[];
    deletedEntities: number[];
    timestamp: number;
}

export interface SyncStoreTimestamps{
    [stateProperty: string]: number;
}

export interface SyncHttpFetcher {
    fetch$(config: SyncConfig, timestamps: SyncStoreTimestamps): Observable<SyncResponse>
}

export interface CustomSyncProviders { fetcher: Type<SyncHttpFetcher>, config: SyncStateConfig<any> }