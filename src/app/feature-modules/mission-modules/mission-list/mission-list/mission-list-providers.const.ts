import { Provider } from '@angular/core';
import { ComponentStoreProviders } from '@state/constants/providers.const';
import { STORE_DEFAULT_STATE, STORE_REDUCERS } from '@state/constants/injection-tokens.const';
import { MissionListFacade } from '../mission-list.facade';
import { SetMissionCriteriaReducer } from '../set-mission-criteria.reducer';
import { MissionListDefaultState } from './mission-list-default-state.const';

export const MissionListProviders: Provider[] = [
    MissionListFacade,
    ...ComponentStoreProviders,
    { provide: STORE_REDUCERS, useValue: SetMissionCriteriaReducer, multi: true },
    { provide: STORE_DEFAULT_STATE, useValue: MissionListDefaultState }
]