export type PersistanceConfig<TState> = { [key in keyof TState]: PersistancePropConfig }

export interface PersistancePropConfig {
    critical?: boolean;
    enableTempData?: boolean;
}