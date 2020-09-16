import { StateHttpCommand } from '../state-http-converter/state-http-command.interface';

export interface IStateHttpCommandHandler<TState>{
    dispatch(command: StateHttpCommand<TState>): void
}