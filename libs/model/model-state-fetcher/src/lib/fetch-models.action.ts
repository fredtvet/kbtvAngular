import { Prop, Immutable } from "global-types";
import { StateAction } from "state-management";

export const FetchModelsAction = "FETCH_MODELS_ACTION";
export interface FetchModelsAction<TState> extends StateAction<typeof FetchModelsAction<TState>> { props: Prop<Immutable<TState>>[]; }
