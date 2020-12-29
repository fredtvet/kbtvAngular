import { Immutable } from "global-types";

export interface SelectableEntity<T>{
    entity: Immutable<T>;
    selected: boolean;
}