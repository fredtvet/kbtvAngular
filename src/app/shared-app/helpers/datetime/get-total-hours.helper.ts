export function _getTotalHours(first: number, last: number): number{
    return Math.round((Math.abs(first - last) / 36e5)* 10) / 10
}