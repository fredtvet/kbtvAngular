import { Immutable, ImmutableArray, UnknownState } from "@global/interfaces";
import { Prop } from "@state/interfaces";

export function _selectSlice<TState>(
    state: Immutable<TState>,
    props: ImmutableArray<Prop<TState>>
): Immutable<Partial<TState>> {
    const returnState: Partial<TState> = {}
    for(const prop of props) (<UnknownState>returnState)[prop] = (<UnknownState>state)[prop];
    return <Immutable<TState>> returnState;
}