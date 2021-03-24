import { Immutable } from "global-types";

/** Represents a key/value object with configurations of the db properties. */
export type StateDbConfig<TState> = { [key in keyof TState]: StatePropConfig }

export type MapFn<T, U = Partial<T>> = (value: Immutable<T>) => U

/** Represents a object with configurations for a state property that should be persisted by the db. */
export interface StatePropConfig {
    /** If set to true, the state will be stored in localStorage to ensure fast loading time.
     *  This causes read/writes to be synchronous and should therefore be used with consideration. */
    critical?: boolean;
    /** A mapping function that runs before value changes are persisted to the db.  */
    onPersistMapping?: MapFn<any, any>
}