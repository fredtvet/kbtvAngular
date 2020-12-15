export function _deepClone<T>(value: Readonly<T>): T {
    const type = typeof value;
    switch (type) {
        case 'object':
            // null and undefined
            if (value == null) {
                return value;
            }

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
            _fixTypes(value, result);
            return result;
        default:
            return value;
    }
}

function _fixPropertyValue(original: Readonly<unknown>, copy: unknown, key: number | string): void {
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
                _fixTypes(originalValue, copy[key]);
            }
            break;

        case 'number':
            if (isNaN(originalValue)) {
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

function _fixTypes(original: Readonly<unknown>, copy: unknown): void {
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

function _newRegExp(value) {
    const regexpText = String(value);
    const slashIndex = regexpText.lastIndexOf('/');
    return new RegExp(regexpText.slice(1, slashIndex), regexpText.slice(slashIndex + 1));
}