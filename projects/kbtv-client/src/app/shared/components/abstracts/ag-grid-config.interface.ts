import { ImmutableArray, Maybe } from '@global/interfaces';

export interface AgGridConfig<TRecord>{
    data: Maybe<ImmutableArray<TRecord>>;
}