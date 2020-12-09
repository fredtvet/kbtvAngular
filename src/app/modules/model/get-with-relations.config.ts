import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { Prop } from '@state/interfaces';
import { ModelConfig } from './interfaces';
import { ModelStateConfig } from './model-state.config';

type RelationInclude<TState> = Prop<TState>[] | "all";

export class GetWithRelationsConfig<TState> {

  private propConfig: ModelConfig<any, TState>;

  includedForeignProps: Prop<TState>[];
  includedChildProps: Prop<TState>[];
  includedProps: Prop<TState>[];

  constructor(
    readonly modelProp: Prop<TState>,
    children?: RelationInclude<TState>,
    foreigns?: RelationInclude<TState>
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

  private getProps(includes: Prop<TState>[], props: Prop<TState>[]): Prop<TState>[]{  
    if(!props || !includes?.length) return []; 
    let included: Prop<TState>[] = []; 
    const propMap = _convertArrayToObject(props);
    for(const include of includes){
      if(propMap[include]) included.push(include);
      else 
        console.error(`'${include}' not registered as a relation in model config for '${this.modelProp}'`)
    }
    return included;    
  }
}

