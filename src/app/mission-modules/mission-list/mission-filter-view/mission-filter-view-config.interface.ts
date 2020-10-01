import { FilterViewConfig } from 'src/app/core/services/filter/interfaces';
import { StateMissions, StateEmployers, StateMissionTypes } from 'src/app/core/services/state/interfaces';
import { MissionCriteria } from 'src/app/shared/interfaces';

export interface MissionFilterViewConfig extends FilterViewConfig<MissionCriteria>{
    state: StateMissions & StateEmployers & StateMissionTypes
}