import { ImmutableArray, Immutable } from '@immutable/interfaces';

export function _sortByBool<T>(collection: ImmutableArray<T>, prop: Extract<keyof T, string>, trueFirst?: boolean): Immutable<T>[]{
    if(!collection?.length) return [];
    return collection.slice().sort((x: any, y: any) => {
        if(trueFirst) return (x[prop] === y[prop])? 0 : x[prop]? -1 : 1;
        return (x[prop] === y[prop])? 0 : x[prop]? 1 : -1;
    });
}