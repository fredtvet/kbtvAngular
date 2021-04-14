import { Immutable, ImmutableArray, UnknownState, Prop } from 'global-types';
import { ModelCommand } from './model-command.enum';

export interface ModelConfig<TModel, TState> { 
    /** State property containing model data */
    stateProp: Prop<TState>,
    /** Base url for model api calls */
    apiUrl: string, 
    /** A property used to get a value that unqiuely identifies the model. */
    idProp: Prop<TModel>, 
    /** Set to true if model can be fetched from external API  */
    fetchable?: boolean, 
    /** Property used as foreign reference in other models */
    foreignProp?: string,
    /** Property used as foreign key in other models */
    foreignKey?: string,
    /** Property used to get a unique value used in model views. */
    displayProp?: Prop<TModel>,
    children?: ChildRelation<TState>[],
    foreigns?: Prop<TState>[]
}

/** A one to many relationship child */
export interface ChildRelation<TState> { 
    /** Child state property */
    prop: Prop<TState>, 
    /** Set to true if children should be deleted when parents are. */
    cascadeDelete?: boolean 
}

/** Information on which relationships should be included together with model */
export interface RelationInclude<TState> {
    /** The model property */
    prop: Immutable<Prop<TState>>,
    /** Foreign properties that should be included. Set to 'all' to get all relationships */
    foreigns?: ImmutableArray<Prop<TState>> | "all",
    /** Child properties that should be included. Set to 'all' to get all relationships */
    children?: ImmutableArray<Prop<TState>> | "all"
};

export type SaveAction = ModelCommand.Create | ModelCommand.Update;

export type ModelConfigMap<TState> = {[key: string]: Immutable<ModelConfig<unknown, TState>>};

/** Information about model commands communication with external api  */
export type ModelCommandApi<TSuffix> = {
    /** The http method used to send the command */
    method: "POST" | "PUT" | "DELETE", 
    /** The suffix appended to the base model url provided in {@link ModelConfig} */
    suffix: TSuffix
}

/** Represents options set on optimistic requests made by model commands */
export interface OptimisticRequestOptions {
    /** A description of the action the request represents */
    description: string
}

export interface ModelCommandApiMap {
    [ModelCommand.Create]: Immutable<ModelCommandApi<string>>,
    [ModelCommand.Update]: Immutable<ModelCommandApi<(id: unknown) => string>>,
    [ModelCommand.Delete]: Immutable<ModelCommandApi<(id: unknown) => string>>,
    [ModelCommand.DeleteRange]: Immutable<ModelCommandApi<string>>,
    [ModelCommand.Mail]: Immutable<ModelCommandApi<string>>
}

/** A state slice of unknown model state */
export type UnknownModelState = { [key: string]: UnknownState[] }

/** Represents a slice of state containing an map of fetching statuses for given models */
export interface StateIsFetching<TState> { isFetching: Record<Prop<TState>, boolean> }