import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { StateSyncConfig } from 'state-sync';

export interface StoreState extends StateCurrentUser, StateSyncConfig {} 