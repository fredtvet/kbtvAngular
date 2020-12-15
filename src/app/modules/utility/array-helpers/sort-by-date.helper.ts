import { Immutable, ImmutableArray } from '@immutable/interfaces';

export function _sortByDate<T extends Object>(
    collection: ImmutableArray<T>, 
    prop: Extract<keyof Immutable<T>, string>, 
    direction: "asc" | "desc" = "desc"): Immutable<T>[]{
    if(!collection) return;
    return collection.slice().sort((a: Immutable<T>, b: Immutable<T>) => {
        if(!a[prop]) return 1;
        if(!b[prop]) return -1;

        let aVal: Date = new Date(a[prop] as unknown as Date);
        let bVal: Date = new Date(b[prop] as unknown as Date);

        if(direction === "asc") return aVal.getTime() - bVal.getTime();
        else return bVal.getTime() - aVal.getTime();
    });
}