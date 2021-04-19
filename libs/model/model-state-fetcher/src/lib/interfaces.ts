import { Prop, UnknownState } from "global-types";
import { ModelConfig } from "model/core";

/** Represents an extended model configuration for a given model for fetchable models */
export interface ModelFetcherConfig<TModel = any, TState = UnknownState> extends ModelConfig<TModel, TState>{
  /** Url endpoint that serves the model data when fetched. If not set, fetching will be disabled for given model.*/
  fetchUrl?: string;
}

/** Represents a slice of state containing an map of fetching statuses for given models */
export interface StateIsFetching<TState> { isFetching: Record<Prop<TState>, boolean> }
