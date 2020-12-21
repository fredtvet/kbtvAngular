import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { Immutable, ImmutableArray } from '@global/interfaces';
import { Prop } from '@state/interfaces';
import { ModelConfig } from './interfaces';
import { ModelStateConfig } from './model-state.config';

type RelationInclude<TState> = ImmutableArray<Prop<TState>> | "all" | null;

export class GetWithRelationsConfig<TState> {

  private propConfig: Immutable<ModelConfig<unknown, TState>>;

  includedForeignProps: ImmutableArray<Prop<TState>>;
  includedChildProps: ImmutableArray<Prop<TState>>;
  includedProps: ImmutableArray<Prop<TState>>;

  constructor(
    readonly modelProp: Immutable<Prop<TState>>,
    children?: RelationInclude<TState>,
    foreigns?: RelationInclude<TState>
  ) {

    this.propConfig = ModelStateConfig.get(modelProp);

    const fkProps = this.propConfig?.foreigns;
    this.includedForeignProps = 
      foreigns === "all" ? (fkProps || []) : this.getProps(foreigns || [], fkProps || [])

    const childProps = this.propConfig?.children?.map(x => x.prop)
    this.includedChildProps = 
      children === "all" ? (childProps || []) : this.getProps(children || [], childProps || []) 

    this.includedProps = [modelProp, ...this.includedChildProps, ...this.includedForeignProps]
  }

  private getProps(includes: ImmutableArray<Prop<TState>>, props: ImmutableArray<Prop<TState>>): ImmutableArray<Prop<TState>>{  
    if(!props || !includes?.length) return []; 
    let included: Immutable<Prop<TState>>[] = []; 
    const propMap = _convertArrayToObject(props);
    for(const include of includes){
      if(propMap[include]) included.push(include);
      else 
        console.error(`'${include}' not registered as a relation in model config for '${this.modelProp}'`)
    }
    return included;    
  }
}

