import { StateSyncConfig, StateCurrentUser } from 'src/app/core/state';

export interface StoreState extends 
    StateCurrentUser,
    StateSyncConfig {} 