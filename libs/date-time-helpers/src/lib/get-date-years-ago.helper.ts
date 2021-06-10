/**
 * Get a date x years ago 
 * @param yearsAgo - The number of years the date should go back from now
 */
export function _getDateYearsAgo(yearsAgo: number): Date  {
    const date = new Date();
    date.setFullYear(date.getFullYear() - yearsAgo);
    return date;
}