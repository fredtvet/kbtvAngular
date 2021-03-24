import { ImmutableArray, Maybe } from 'global-types';

export interface AgGridConfig<TRecord>{
    data: Maybe<ImmutableArray<TRecord>>;
}