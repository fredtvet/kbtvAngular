import { BaseStateToHttpConverter, StateHttpConverter } from '../state/state-http-converter';
import { ModelConfig, ModelStateConfig } from './model-state.config';
import { ModelStateCommand } from './interfaces';

export abstract class ModelToStateHttpConverter<TState, TCommand extends ModelStateCommand> 
    extends BaseStateToHttpConverter<TState, TCommand> implements StateHttpConverter<TState, TCommand>{

    protected modelConfig: ModelConfig;

    constructor(){ super(); }

    protected setupCommand(command: TCommand): TCommand {     
        if(!command.stateProp) console.error(`State property is required`);
        this.modelConfig = ModelStateConfig.get(command.stateProp);
        return command;
    }

}