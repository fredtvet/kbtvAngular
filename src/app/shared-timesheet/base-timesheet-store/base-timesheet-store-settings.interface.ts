import { Prop } from 'src/app/core/model/state.types';

export interface BaseTimesheetStoreSettings<TState> {
    groupByProp: Prop<TState>,
    criteriaProp: Prop<TState>,
    initialState: Partial<TState>
}