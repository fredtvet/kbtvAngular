import { User } from 'src/app/core/models';

export interface SyncResponse{
    [key: string]: EntitySyncResponse
}

export interface EntitySyncResponse{
    entities: Object[];
    deletedEntities: number[];
    timestamp: number;
}