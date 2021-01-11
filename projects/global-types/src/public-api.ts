/**
 * A library of generic typescript types
 * @packageDocumentation
 */

/** A value that can't be mutated */
export type Immutable<T> =
    T extends (infer R)[] ? ImmutableArray<R> :
    T extends Function ? T :
    T extends object ? ImmutableObject<T> :
    T;

export interface ImmutableArray<T> extends ReadonlyArray<Immutable<T>> {}

export type ImmutableObject<T> = {
    readonly [P in keyof T]: Immutable<T[P]>;
};

export type UnknownState = {[key: string]: unknown}

export type Maybe<T> = T | null | undefined;

export type DateInput = Date | string | number;

export type Prop<T> = Extract<keyof T, string>;

export type KeyVal<T> = { [key: string]: Immutable<T> }