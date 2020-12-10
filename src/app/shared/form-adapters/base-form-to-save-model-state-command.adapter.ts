
import { ModelState } from '@core/state/model-state.interface';
import { ModelConfig } from '@model/interfaces';
import { ModelStateConfig } from '@model/model-state.config';
import { SaveAction, SaveModelStateCommand } from '@model/state/save-model/save-model-action.const';
import { _find } from '@array/find.helper';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { Prop } from '@state/interfaces';
import { ModelFormToSaveModelInput } from '@model-form/interfaces';

export abstract class BaseFormToSaveModelStateCommandAdapter<TModel, TForm> 
    implements SaveModelStateCommand<TModel, ModelState> {

    actionId: string;
    entity: TModel;
    saveAction: SaveAction;
    stateProp: Prop<ModelState>;

    protected modelConfig: ModelConfig<TModel, ModelState>;

    constructor(protected input: ModelFormToSaveModelInput<TForm, ModelState>){
        this.adapt()
    }
    
    protected adapt(): void{
        this.stateProp = this.input.stateProp;
        this.saveAction = this.input.saveAction;
        this.modelConfig = ModelStateConfig.get(this.stateProp);
        this.convertFormStateToEntity();
        this.checkNestedForeigns(this.modelConfig.foreigns);
        this.entity = _modelIdGenerator(this.entity, this.modelConfig);      
    }

    protected convertFormStateToEntity(): void{
        console.error("Method not implemented");
        return null;
    }

    private checkNestedForeigns(foreignStateProps: Prop<ModelState>[]): void{
        if(!foreignStateProps) return;
        for(const foreignStateProp of foreignStateProps){
            const {foreignKey, displayProp, foreignProp, identifier} = ModelStateConfig.get(foreignStateProp);
            const fkEntity = this.entity[foreignProp];
            if(!fkEntity) continue; //If no fk entity set on entity, ignore

            const fkDisplayValue = fkEntity[displayProp]; //Fetch display value used in auto completes   

            if(!fkDisplayValue) //If no fk value provided, set foreign key to null on entity 
                this.entity[foreignKey] = null;

            const existingFkEntity = //Check if fkEntity with same display value exists
                _find(this.input.options[foreignStateProp] as any, fkDisplayValue, displayProp)

            if(existingFkEntity) //If existing fkEntity, set foreign key on entity
                this.entity[foreignKey] = existingFkEntity[identifier]; 
            
            if(existingFkEntity || !fkDisplayValue) //If no fkEntity or fk value provided, set nested fk entity to null
                this.entity[foreignProp] = null;
        }

    }
}