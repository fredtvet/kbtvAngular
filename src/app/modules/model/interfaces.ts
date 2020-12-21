import { Immutable, UnknownState } from '@global/interfaces';
import { Prop } from '@state/interfaces';
import { ModelCommand } from './model-command.enum';

export interface ModelConfig<TModel, TState> { 
    stateProp: Prop<TState>,
    apiUrl: string, 
    identifier: Prop<TModel>, 
    autoFetch?: boolean, 
    foreignProp?: string,
    foreignKey?: string,
    displayProp?: Prop<TModel>,
    children?: ChildRelation<TState>[],
    foreigns?: Prop<TState>[]
}

export interface ChildRelation<TState> { prop: Prop<TState>, cascadeDelete?: boolean }

export type SaveAction = ModelCommand.Create | ModelCommand.Update;

export type ModelConfigMap<TState> = {[key: string]: Immutable<ModelConfig<unknown, TState>>};

export type CommandApiConfig<TSuffix> = {method: "POST" | "PUT" | "DELETE", suffix: TSuffix}

export interface CommandApiMap {
    [ModelCommand.Create]: Immutable<CommandApiConfig<string>>,
    [ModelCommand.Update]: Immutable<CommandApiConfig<(id: unknown) => string>>,
    [ModelCommand.Delete]: Immutable<CommandApiConfig<(id: unknown) => string>>,
    [ModelCommand.DeleteRange]: Immutable<CommandApiConfig<string>>,
    [ModelCommand.Mail]: Immutable<CommandApiConfig<string>>
}

export type KeyVal<T> = { [key: string]: Immutable<T> }

export type UnknownModelState = { [key: string]: UnknownState[] }