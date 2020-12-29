import { Immutable, ImmutableArray, Maybe, UnknownState, Prop } from 'global-types'; 

export function _sortByBool<T extends {}>(
    collection: Maybe<ImmutableArray<T>>, 
    prop: Prop<Immutable<T>>, 
    trueFirst?: boolean): Immutable<T>[]{
    if(!collection?.length) return [];
    return collection.slice().sort((x: UnknownState, y: UnknownState) => {
        if(trueFirst) return (x[prop] === y[prop])? 0 : x[prop]? -1 : 1;
        return (x[prop] === y[prop])? 0 : x[prop]? 1 : -1;
    });
}