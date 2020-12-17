import { Maybe } from "@global/interfaces";

export interface FilteredResponse<TCriteria, TRecord>{
    criteria: Maybe<TCriteria>,
    records: Maybe<TRecord[]>
}