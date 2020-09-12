import { StateHttpCommand } from './state-http-command.interface';
import { StateCommand } from './state-command.interface';
import { Converter } from '../../interfaces/converter.interface';

export interface StateHttpConverter<TState, TCommand extends StateCommand> extends Converter<TCommand, StateHttpCommand<TState>>{
    convert(input: TCommand): StateHttpCommand<TState>;
}