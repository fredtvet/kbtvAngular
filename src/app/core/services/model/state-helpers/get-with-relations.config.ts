import { ModelConfig, ModelStateConfig } from '../model-state.config';
import { RelationIncludeConfig } from '../../state/interfaces';
import { ModelState } from '../interfaces/model-state.interface';
import { Prop } from 'src/app/shared-app/prop.type';

export class GetWithRelationsConfig {

  private propConfig: ModelConfig;

  includedForeignProps: Prop<ModelState>[];
  includedChildProps: Prop<ModelState>[];
  includedProps: Prop<ModelState>[];

  constructor(
    readonly modelProp: Prop<ModelState>,
    childrenCfg?: RelationIncludeConfig,
    foreignsCfg?: RelationIncludeConfig
  ) {

    this.propConfig = ModelStateConfig.get(this.modelProp);

    this.includedForeignProps = 
        this.getIncludedProps(foreignsCfg, this.propConfig?.foreigns)

    this.includedChildProps = 
        this.getIncludedProps(childrenCfg, this.propConfig?.children)

    this.includedProps = [modelProp, ...this.includedChildProps, ...this.includedForeignProps]
  }

  private getIncludedProps(cfg: RelationIncludeConfig, props: Prop<ModelState>[]): Prop<ModelState>[]{
    let included: Prop<ModelState>[] = [];
    if(!cfg || !props) return included; 

    if(cfg.includeAll)
        included = props;
    else if(cfg.include)
        included = props.filter((x) => cfg.include[x]);

    return included;    
  }
}

