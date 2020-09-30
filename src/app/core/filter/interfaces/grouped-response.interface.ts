export interface GroupedResponse<TGroupBy, TRecord>{
    groupBy: TGroupBy;
    records: TRecord[]
}