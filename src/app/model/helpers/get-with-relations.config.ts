import { Model } from 'src/app/core/models';
import { _convertArrayToObject } from 'src/app/shared-app/helpers/array/convert-array-to-object.helper';
import { Prop } from 'src/app/shared-app/prop.type';
import { ModelState } from '../interfaces/model-state.interface';
import { ModelConfig, ModelStateConfig } from '../model-state.config';

type RelationInclude = Prop<ModelState>[] | "all";

export class GetWithRelationsConfig {

  private propConfig: ModelConfig<Model>;

  includedForeignProps: Prop<ModelState>[];
  includedChildProps: Prop<ModelState>[];
  includedProps: Prop<ModelState>[];

  constructor(
    readonly modelProp: Prop<ModelState>,
    children?: RelationInclude,
    foreigns?: RelationInclude
  ) {

    this.propConfig = ModelStateConfig.get(this.modelProp);

    const fkProps = this.propConfig?.foreigns;
    this.includedForeignProps = 
      foreigns === "all" ? (fkProps || []) : this.getProps(foreigns, fkProps)

    const childProps = this.propConfig?.children
    this.includedChildProps = 
      children === "all" ? (childProps || []) : this.getProps(children, childProps) 

    this.includedProps = [modelProp, ...this.includedChildProps, ...this.includedForeignProps]
  }

  private getProps(includes: Prop<ModelState>[], props: Prop<ModelState>[]): Prop<ModelState>[]{  
    if(!props || !includes?.length) return []; 
    let included: Prop<ModelState>[] = []; 
    const propMap = _convertArrayToObject(props);
    for(const include of includes){
      if(propMap[include]) included.push(include);
      else 
        console.error(`'${include}' not registered as a relation in model config for '${this.modelProp}'`)
    }
    return included;    
  }
}

