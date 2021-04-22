import { Provider } from '@angular/core';
import { StateManagementModule } from 'state-management';
import { MissionListFacade } from '../mission-list.facade';
import { SetMissionCriteriaReducer } from '../set-mission-criteria.reducer';
import { MissionListDefaultState } from './mission-list-default-state.const';

export const MissionListProviders: Provider[] = [
    MissionListFacade,
    ...StateManagementModule.forComponent({
        reducers: [SetMissionCriteriaReducer],
        defaultState: MissionListDefaultState
    }),
]