import { Maybe } from "global-types";

export interface FilteredResponse<TCriteria, TRecord>{
    criteria: Maybe<TCriteria>,
    records: Maybe<TRecord[]>
}