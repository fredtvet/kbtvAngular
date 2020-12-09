import { Type } from '@angular/core';
import { Observable } from 'rxjs';

export interface StateSyncConfig { syncConfig: SyncConfig }
export interface StateSyncTimestamps { syncTimestamps: SyncStoreTimestamps; }

export interface StoreState extends StateSyncConfig, StateSyncTimestamps {}

export type SyncStateConfig<TState> = {[key in keyof TState]: SyncStatePropConfig}

export interface SyncStatePropConfig {
    // responseKey: string,
    // requestKey: string,
    singular?: boolean,
    wipeable?: boolean,
    identifier: string
}

export interface SyncConfig{
    refreshTime?: number; 
    initialNumberOfMonths?: string;
}

export type SyncResponse<TState> = {[key in keyof TState]: EntitySyncResponse}

export interface EntitySyncResponse{
    entities: Object[];
    deletedEntities: number[];
    timestamp: number;
}

export interface SyncStoreTimestamps{
    [stateProperty: string]: number;
}

export interface SyncHttpFetcher<TState> {
    fetch$(config: SyncConfig, timestamps: SyncStoreTimestamps): Observable<SyncResponse<TState>>
}

export interface CustomSyncProviders { fetcher: Type<SyncHttpFetcher<any>>, config: SyncStateConfig<any> }