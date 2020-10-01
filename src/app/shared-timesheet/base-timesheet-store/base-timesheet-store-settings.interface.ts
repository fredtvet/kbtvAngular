import { Prop } from 'src/app/shared-app/prop.type';

export interface BaseTimesheetStoreSettings<TState> {
    groupByProp: Prop<TState>,
    criteriaProp: Prop<TState>,
    initialState: Partial<TState>
}