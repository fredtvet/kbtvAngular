export interface SyncResponse{
    [key: string]: EntitySyncResponse
}

export interface EntitySyncResponse{
    entities: Object[];
    deletedEntities: number[];
    timestamp: number;
}