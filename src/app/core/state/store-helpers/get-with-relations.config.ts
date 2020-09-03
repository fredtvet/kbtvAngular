import { ModelState } from "../global.state";
import { ModelPropertyConfig, ModelStateConfig } from "../model-state.config";

export class GetWithRelationsConfig {

  private propConfig: ModelPropertyConfig;

  includedForeignProps: (keyof Partial<ModelState>)[];
  includedChildProps: (keyof Partial<ModelState>)[];
  includedProps: (keyof Partial<ModelState>)[];

  constructor(
    readonly modelProp: keyof ModelState,
    childrenCfg?: RelationIncludeConfig,
    foreignsCfg?: RelationIncludeConfig
  ) {
    this.propConfig = ModelStateConfig[this.modelProp];

    if (!this.propConfig)
      throw `No model state config for property ${this.propConfig}`;

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

export interface RelationIncludeConfig {
  includeAll?: boolean;
  include?: { [key in keyof Partial<ModelState>]: boolean };
}
