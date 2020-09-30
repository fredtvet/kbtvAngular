import { Prop } from 'src/app/core/model/state.types';

export function _sortByBool<T>(collection: T[], prop: Prop<T>, trueFirst?: boolean): T[]{
    if(!collection) return;
    return collection.sort((x: any, y: any) => {
        if(trueFirst) return (x[prop] === y[prop])? 0 : x[prop]? -1 : 1;
        return (x[prop] === y[prop])? 0 : x[prop]? 1 : -1;
    });
}