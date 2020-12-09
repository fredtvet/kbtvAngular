export function _sortByDate<T>(collection: T[], prop: Extract<keyof T, string>, direction: "asc" | "desc" = "desc"): T[]{
    if(!collection) return;
    return collection.sort((a: any, b: any) => {
        if(!a[prop]) return 1;
        if(!b[prop]) return -1;

        let aVal: Date = new Date(a[prop]);
        let bVal: Date = new Date(b[prop]);

        if(direction === "asc") return aVal.getTime() - bVal.getTime();
        else return bVal.getTime() - aVal.getTime();
    });
}