import { Type } from '@angular/core';
import { Observable } from 'rxjs';

export interface StateSyncConfig { syncConfig: SyncConfig }
export interface StateSyncTimestamp { syncTimestamp: number; }

export interface StoreState extends StateSyncConfig, StateSyncTimestamp {}

export type SyncStateConfig<TState> = {[key in keyof TState]: SyncStatePropConfig}

export interface SyncStatePropConfig {
    type?: "value" | "array",
    wipeable?: boolean,
    identifier: string
}

export interface SyncConfig{
    refreshTime?: number; 
    initialNumberOfMonths?: string;
}

export interface SyncResponse<TState>{
    timestamp: number;
    arrays: SyncArraysResponse<TState>;
    values: SyncValuesResponse<TState>;
}

export type SyncArraysResponse<TState> = {[key in keyof TState]: SyncArrayResponse}

export type SyncValuesResponse<TState> = {[key in keyof TState]: unknown}

export interface SyncArrayResponse{
    entities: Object[];
    deletedEntities: number[];
}

export interface SyncHttpFetcher<TState> {
    fetch$(config: SyncConfig, timestamp: number): Observable<SyncResponse<TState>>
}

export interface CustomSyncProviders { fetcher: Type<SyncHttpFetcher<unknown>>, config: SyncStateConfig<unknown> }