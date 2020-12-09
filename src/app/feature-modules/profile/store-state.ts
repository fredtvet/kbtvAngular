import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { StateSyncConfig } from '@sync/interfaces';

export interface StoreState extends StateCurrentUser, StateSyncConfig {} 