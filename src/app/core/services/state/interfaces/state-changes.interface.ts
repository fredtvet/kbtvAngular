export interface StateChanges<T> {
    action?: string,
    stateChanges: Partial<T>
}
