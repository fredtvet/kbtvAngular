import { Prop } from 'src/app/shared-app/prop.type';
import { BaseStateToHttpConverter } from '../state/state-http-converter/base-state-http.converter';
import { StateHttpConverter } from '../state/state-http-converter/state-http-converter.interface';
import { ModelStateCommand } from './interfaces';
import { ModelConfig, ModelStateConfig } from './model-state.config';

export abstract class ModelToStateHttpConverter<TState, TCommand extends ModelStateCommand> 
    extends BaseStateToHttpConverter<TState, TCommand> implements StateHttpConverter<TState, TCommand>{

    protected modelConfig: ModelConfig;

    constructor(){ super(); }

    protected setupCommand(command: TCommand): TCommand {     
        if(!command.stateProp) console.error(`State property is required`);
        this.modelConfig = ModelStateConfig.get(command.stateProp);
        return command;
    }

    protected createProperties(command: TCommand): Prop<TState>[]{
        return [command.stateProp as any];
    }

}