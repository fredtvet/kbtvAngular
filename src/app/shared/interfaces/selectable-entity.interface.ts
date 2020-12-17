import { Immutable } from "@global/interfaces";

export interface SelectableEntity<T>{
    entity: Immutable<T>;
    selected: boolean;
}