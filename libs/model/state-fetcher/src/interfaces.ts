import { Prop, UnknownState } from "global-types";
import { ModelConfig, StateModels } from "model/core";

/** Represents an extended model configuration for a given model for fetchable models */
export interface ModelFetcherConfig<
TState = UnknownState, 
TModel extends StateModels<TState> = StateModels<TState>> extends ModelConfig<TState, TModel>{
  /** Url endpoint that serves the model data when fetched. If not set, fetching will be disabled for given model.*/
  fetchUrl?: string;
}

/** Represents a slice of state containing an map of fetching statuses for given models */
export interface StateIsFetching<TState> { isFetching: Record<Prop<TState>, boolean> }
