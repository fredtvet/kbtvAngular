export function _hasSameState<T extends Object>(state1: T, state2: T): boolean{
    const state = state1 || {};
    const compareState = state2 || {}
    for (var key in state) {  
        const value = state[key];
        const compareValue = compareState[key];
        if(value && typeof value === "object") {
            if(!_hasSameState(value, compareValue)) return false;
        }
        else if(value != compareState[key]) return false;
    }
    return true;
}