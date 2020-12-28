import { Immutable } from "global-types";

export type PersistanceConfig<TState> = { [key in keyof TState]: PersistancePropConfig }

export type MapFn<T, U = Partial<T>> = (value: Immutable<T>) => U

export interface PersistancePropConfig {
    critical?: boolean;
    onPersistMapping?: MapFn<any, any>
}