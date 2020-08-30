export interface BaseTimesheetStoreSettings<TState> {
    groupByProp: Extract<keyof TState, string>
    criteriaProp: Extract<keyof TState, string>
    initialState: Partial<TState>
}