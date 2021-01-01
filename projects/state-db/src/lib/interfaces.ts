import { Immutable } from "global-types";

export type StateDbConfig<TState> = { [key in keyof TState]: StatePropConfig }

export type MapFn<T, U = Partial<T>> = (value: Immutable<T>) => U

export interface StatePropConfig {
    critical?: boolean;
    onPersistMapping?: MapFn<any, any>
}