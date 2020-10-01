import { StateHttpCommand } from '../state-http-converter/state-http-command.interface';

export interface IStateHttpCommandHandler{
    dispatch(command: StateHttpCommand<any>): void
}