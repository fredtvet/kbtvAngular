import { Prop, StateAction } from '@state/interfaces';
import { ModelCommand } from './model-command.enum';

export interface ModelStateCommand<TState> extends StateAction{
    stateProp?: Prop<TState>;
}

export interface ModelConfig<TModel, TState> { 
    stateProp: Prop<TState>,
    apiUrl: string, 
    identifier: Prop<TModel>, 
    autoFetch?: boolean, 
    foreignProp?: string,
    foreignKey?: string,
    displayProp?: Prop<TModel>,
    children?: Prop<TState>[],
    foreigns?: Prop<TState>[]
}

export type ModelConfigMap<TState> = {[key: string]: ModelConfig<any, TState>};

export type CommandApiConfig<TSuffix> = {method: "POST" | "PUT" | "DELETE", suffix: TSuffix}

export interface CommandApiMap {
    [ModelCommand.Create]: CommandApiConfig<string>,
    [ModelCommand.Update]: CommandApiConfig<(id: string) => string>,
    [ModelCommand.Delete]: CommandApiConfig<(id: string) => string>,
    [ModelCommand.DeleteRange]: CommandApiConfig<string>,
    [ModelCommand.Mail]: CommandApiConfig<string>
}

export type KeyVal<T> = { [key: string]: T }