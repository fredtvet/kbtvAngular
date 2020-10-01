export interface BaseStoreSettings {
    /**
     * Log any store state changes to the browser console (defaults to `false`).
     */
    logStateChanges?: boolean;
}

export interface ObservableStoreSettings extends BaseStoreSettings { }
