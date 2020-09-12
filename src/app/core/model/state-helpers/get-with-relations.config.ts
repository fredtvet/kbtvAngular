import { ModelConfig, ModelStateConfig } from '../model-state.config';
import { ModelState } from '../model.state';
import { RelationIncludeConfig } from '../../state';

export class GetWithRelationsConfig {

  private propConfig: ModelConfig;

  includedForeignProps: (keyof Partial<ModelState>)[];
  includedChildProps: (keyof Partial<ModelState>)[];
  includedProps: (keyof Partial<ModelState>)[];

  constructor(
    readonly modelProp: string,
    childrenCfg?: RelationIncludeConfig,
    foreignsCfg?: RelationIncludeConfig
  ) {
    this.propConfig = ModelStateConfig.get(this.modelProp);

    this.includedForeignProps = 
        this.getIncludedProps(foreignsCfg, this.propConfig.foreigns)

    this.includedChildProps = 
        this.getIncludedProps(childrenCfg, this.propConfig.children)

    this.includedProps = [modelProp, ...this.includedChildProps, ...this.includedForeignProps]
  }

  private getIncludedProps(cfg: RelationIncludeConfig, props: (keyof Partial<ModelState>)[]): (keyof Partial<ModelState>)[]{
    let included: (keyof Partial<ModelState>)[] = [];
    if(!cfg || !props) return included; 

    if(cfg.includeAll)
        included = props;
    else if(cfg.include)
        included = props.filter((x) => cfg.include[x]);

    return included;    
  }
}

