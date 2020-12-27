import { _deepClone } from './deep-clone.helper';

export function _cloneInstance<T extends Object>(obj: T, deepClone: boolean = true): T {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), deepClone ? _deepClone(obj) : obj);;
}