import { ModelConfig, ModelStateConfig } from '../model-state.config';
import { RelationIncludeConfig } from '../../state';
import { StateProp } from '../state.types';

export class GetWithRelationsConfig<TState> {

  private propConfig: ModelConfig<TState>;

  includedForeignProps: StateProp<TState>[];
  includedChildProps: StateProp<TState>[];
  includedProps: StateProp<TState>[];

  constructor(
    readonly modelProp: StateProp<TState>,
    childrenCfg?: RelationIncludeConfig,
    foreignsCfg?: RelationIncludeConfig
  ) {
    this.propConfig = ModelStateConfig.get<TState>(this.modelProp);

    this.includedForeignProps = 
        this.getIncludedProps(foreignsCfg, this.propConfig.foreigns)

    this.includedChildProps = 
        this.getIncludedProps(childrenCfg, this.propConfig.children)

    this.includedProps = [modelProp, ...this.includedChildProps, ...this.includedForeignProps]
  }

  private getIncludedProps(cfg: RelationIncludeConfig, props: StateProp<TState>[]): StateProp<TState>[]{
    let included: StateProp<TState>[] = [];
    if(!cfg || !props) return included; 

    if(cfg.includeAll)
        included = props;
    else if(cfg.include)
        included = props.filter((x) => cfg.include[x]);

    return included;    
  }
}

