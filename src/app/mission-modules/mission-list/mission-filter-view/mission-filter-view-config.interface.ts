import { FilterViewConfig } from 'src/app/core/filter/interfaces/filter-view-config.interface';
import { StateEmployers, StateMissions, StateMissionTypes } from 'src/app/core/state';
import { MissionCriteria } from 'src/app/shared/interfaces';

export interface MissionFilterViewConfig extends FilterViewConfig<MissionCriteria>{
    state: StateMissions & StateEmployers & StateMissionTypes
}