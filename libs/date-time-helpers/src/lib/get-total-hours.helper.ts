/**
 * Get the total hours between two UNIX millisecond timestamps
 * @param first - The first UNIX millisecond timestamp
 * @param last - The last UNIX milliseconds timestamp
 */
export function _getTotalHours(first: number, last: number): number{
    return Math.round((Math.abs(first - last) / 36e5)* 10) / 10
}