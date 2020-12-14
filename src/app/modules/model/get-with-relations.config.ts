import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { Immutable, ImmutableArray } from '@immutable/interfaces';
import { Prop } from '@state/interfaces';
import { ModelConfig } from './interfaces';
import { ModelStateConfig } from './model-state.config';

type RelationInclude<TState> = Prop<TState>[] | "all";

export class GetWithRelationsConfig<TState> {

  private propConfig: Immutable<ModelConfig<any, TState>>;

  includedForeignProps: ImmutableArray<Prop<TState>>;
  includedChildProps: ImmutableArray<Prop<TState>>;
  includedProps: ImmutableArray<Prop<TState>>;

  constructor(
    readonly modelProp: Prop<TState>,
    children?: RelationInclude<TState>,
    foreigns?: RelationInclude<TState>
  ) {

    this.propConfig = ModelStateConfig.get(modelProp);

    const fkProps = this.propConfig?.foreigns;
    this.includedForeignProps = 
      foreigns === "all" ? (fkProps || []) : this.getProps(foreigns, fkProps)

    const childProps = this.propConfig?.children
    this.includedChildProps = 
      children === "all" ? (childProps || []) : this.getProps(children, childProps) 

    this.includedProps = [modelProp as any, ...this.includedChildProps, ...this.includedForeignProps]
  }

  private getProps(includes: ImmutableArray<string>, props: ImmutableArray<string>): ImmutableArray<Prop<TState>>{  
    if(!props || !includes?.length) return []; 
    let included: Prop<TState>[] = []; 
    const propMap = _convertArrayToObject<string>(props);
    for(const include of includes){
      if(propMap[include]) included.push(include as any);
      else 
        console.error(`'${include}' not registered as a relation in model config for '${this.modelProp}'`)
    }
    return <ImmutableArray<any>> included;    
  }
}

