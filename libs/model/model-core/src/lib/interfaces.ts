import { Prop, Immutable, ImmutableArray, UnknownState } from 'global-types';

export interface ModelConfig<TModel, TState> {
  /** State property containing model data */
  stateProp: Prop<TState>;
  /** A property used to get a value that unqiuely identifies the model. */
  idProp: Prop<TModel>;
  /** Property used as foreign reference in other models */
  foreignProp?: string;
  /** Property used as foreign key in other models */
  foreignKey?: string;
  /** Property used to get a unique value used in model views. */
  displayProp?: Prop<TModel>;
  children?: ChildRelation<TState>[];
  foreigns?: Prop<TState>[];
}

export type ModelConfigMap<
  TState,
  TConfig extends ModelConfig<unknown, TState> = ModelConfig<unknown, TState>
> = { [key: string]: Immutable<TConfig> };

/** A one to many relationship child */
export interface ChildRelation<TState> {
  /** Child state property */
  prop: Prop<TState>;
  /** Set to true if children should be deleted when parents are. */
  cascadeDelete?: boolean;
}

/** Information on which relationships should be included together with model */
export interface RelationInclude<TState> {
  /** The model property */
  prop: Immutable<Prop<TState>>;
  /** Foreign properties that should be included. Set to 'all' to get all relationships */
  foreigns?: ImmutableArray<Prop<TState>> | 'all';
  /** Child properties that should be included. Set to 'all' to get all relationships */
  children?: ImmutableArray<Prop<TState>> | 'all';
}

/** A state slice of unknown model state */
export type UnknownModelState = { [key: string]: UnknownState[] };
