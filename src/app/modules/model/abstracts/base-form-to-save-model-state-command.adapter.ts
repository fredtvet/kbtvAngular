
import { Model } from '@core/models';
import { _find } from '@shared-app/helpers/array/find.helper';
import { _modelIdGenerator } from '@shared-app/helpers/id/model-id-generator.helper';
import { Prop } from '@shared-app/prop.type';
import { ModelFormToSaveModelInput } from '@shared/model-form/interfaces/model-form-to-state-command-adapter.interface';
import { SaveAction } from '@shared/save-action.interface';
import { ModelState } from '../interfaces';
import { ModelConfig, ModelStateConfig } from '../model-state.config';
import { SaveModelStateCommand } from '../state/save-model/save-model-action.const';

export abstract class BaseFormToSaveModelStateCommandAdapter<TModel extends Model, TFormState> 
    implements SaveModelStateCommand<TModel> {

    actionId: string;
    entity: TModel;
    saveAction: SaveAction;
    stateProp: Prop<ModelState>;

    protected modelConfig: ModelConfig<TModel>;

    constructor(protected input: ModelFormToSaveModelInput<TFormState>){
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
                _find<Model>(this.input.options[foreignStateProp], fkDisplayValue, displayProp)

            if(existingFkEntity) //If existing fkEntity, set foreign key on entity
                this.entity[foreignKey] = existingFkEntity[identifier]; 
            
            if(existingFkEntity || !fkDisplayValue) //If no fkEntity or fk value provided, set nested fk entity to null
                this.entity[foreignProp] = null;
        }

    }
}