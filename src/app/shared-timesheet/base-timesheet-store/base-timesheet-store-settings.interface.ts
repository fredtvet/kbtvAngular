import { StateProp } from 'src/app/core/model/state.types';

export interface BaseTimesheetStoreSettings<TState> {
    groupByProp: StateProp<TState>,
    criteriaProp: StateProp<TState>,
    initialState: Partial<TState>
}