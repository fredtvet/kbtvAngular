export interface FilteredResponse<TCriteria, TRecord>{
    criteria: TCriteria,
    records: TRecord[]
}