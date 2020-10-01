export interface FilteredResponse<TCriteria, TRecord>{
    criteria: TCriteria,
    activeCriteriaCount: number,
    records: TRecord[]
}