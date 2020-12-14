import { ImmutableArray } from '@immutable/interfaces';

export interface AgGridConfig<TRecord>{
    data: ImmutableArray<TRecord>;
}