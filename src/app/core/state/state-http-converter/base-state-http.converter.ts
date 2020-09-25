import { StateCommand } from './state-command.interface';
import { StateHttpConverter } from './state-http-converter.interface';
import { StateHttpCommand } from './state-http-command.interface';
import { Prop } from '../../model/state.types';

export abstract class BaseStateToHttpConverter<TState, TCommand extends StateCommand> implements StateHttpConverter<TState, TCommand>{

    constructor(){}

    convert(input: TCommand, overrideApiUrl?: string): StateHttpCommand<TState> {
        if(!input) console.error("No command provided");

        input = this.setupCommand(input);
        const stateHttpCommand: StateHttpCommand<TState> = {
            httpMethod: this.createHttpMethod(input),
            apiUrl: overrideApiUrl || this.createApiUrl(input),
            httpBody: this.createHttpBody(this.cloneInput(input)),
            stateFunc: (state: TState) => this.modifyState(state, input),
            properties: this.createProperties(input),
            cancelMessage: this.createCancelMessage(input)
        };

        return stateHttpCommand;
    }

    protected cloneInput(input: TCommand): TCommand{
        return JSON.parse(JSON.stringify(input));
    }

    protected setupCommand(command: TCommand): TCommand {
        return command;
    }

    protected createProperties(command: TCommand): Prop<TState>[]{
        return null;
    }

    protected createCancelMessage(command: TCommand): string{
        return "En operasjon ble tilbakestilt"
    }

    protected createApiUrl(command: TCommand): string {
        return null;
    }

    protected createHttpMethod(command: TCommand): "POST" | "PUT" | "DELETE" {
        return null;
    }

    protected createHttpBody(command: TCommand): any {
       return null;
    }

    protected modifyState(state: TState, command: TCommand): Partial<TState>{   
        return null;   
    }


}