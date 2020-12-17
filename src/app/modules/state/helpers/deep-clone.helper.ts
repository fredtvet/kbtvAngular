import { Immutable, UnknownState } from "@global/interfaces";

export function _deepClone(value: Immutable<unknown>): unknown {
    const type = typeof value;
    switch (type) {
        case 'object':

            if (value == null)  return null;
            
            let result;

            if (value instanceof Date) {
                result = new Date();
                result.setTime(value.getTime());
                return result;
            }
            else if (value instanceof RegExp) {
                result = _newRegExp(value);
                return result;
            }
            else if (value instanceof Map) {
                result = new Map(value);
                return result;
            }
            else if (value instanceof Set) {
                result = new Set(value);
                return result;
            }

            result = JSON.parse(JSON.stringify(value));
            _fixTypes(<UnknownState> value, result);
            return result;
        default:
            return value;
    }
}

function _fixPropertyValue(original: Immutable<UnknownState>, copy: UnknownState, key: number | string): void {
    const originalValue = original[key];
    const originalType = typeof originalValue;

    switch (originalType) {
        case 'object':
            if (originalValue instanceof Date) {
                var newValue = new Date();
                newValue.setTime(originalValue.getTime());
                copy[key] = newValue;
            }
            else if (originalValue instanceof RegExp) {
                copy[key] = _newRegExp(originalValue);
            }
            else if (originalValue instanceof Map) {
                copy[key] = new Map(originalValue);
            }
            else if (originalValue instanceof Set) {
                copy[key] = new Set(originalValue);
            }
            else if (originalValue instanceof File || originalValue == null) {
                copy[key] = originalValue;
            }
            else {
                _fixTypes(<UnknownState> originalValue, <UnknownState> copy[key]);
            }
            break;

        case 'number':
            if (isNaN(<number> originalValue)) {
                copy[key] = NaN;
            }
            else if (originalValue == Infinity) {
                copy[key] = Infinity;
            }
            break;

        default:
            break;
    }
}

function _fixTypes(original: Immutable<UnknownState>, copy: UnknownState): void {
    if (original instanceof Array) {
        for (let index = 0; index < original.length; index++) {
            _fixPropertyValue(original, copy, index);
        }
    }
    else {
        let keys = Object.getOwnPropertyNames(original);
        keys.forEach(key => {
            _fixPropertyValue(original, copy, key);
        });
    }
}

function _newRegExp(value: unknown) {
    const regexpText = String(value);
    const slashIndex = regexpText.lastIndexOf('/');
    return new RegExp(regexpText.slice(1, slashIndex), regexpText.slice(slashIndex + 1));
}