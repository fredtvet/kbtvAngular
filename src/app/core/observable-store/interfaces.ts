import { Subscription, Observable } from "rxjs";

// export interface StateSliceSelector {
//     /**
//      * Function to select the slice of the store being managed by this particular service. 
//      * If specified then the specific state slice is returned. 
//      * If not specified then the total state is returned (defaults to `null`).
//      */
//     stateSliceSelector?: (state: any) => any;
// }

export interface BaseStoreSettings {
    /**
     * Log any store state changes to the browser console (defaults to `false`).
     */
    logStateChanges?: boolean;
}

export interface ObservableStoreSettings extends BaseStoreSettings { }

// export interface ObservableStoreGlobalSettings extends BaseStoreSettings {
//     /**
//      * Not currently used. Reserved for future use.
//      */
//     isProduction?: boolean;
// }

export interface StateChanges<T> {
    action?: string,
    stateChanges: Partial<T>
}
