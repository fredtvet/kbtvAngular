export function _mergeDateAndTime(date: any, time:any): Date{
    const d = new Date(date);
    const t = new Date(time);
    d.setHours(t.getHours(), t.getMinutes(), t.getSeconds());
    return d;
}