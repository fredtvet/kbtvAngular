import { ModelState } from '../../model/model.state';
import { Prop } from '../../model/state.types';

export interface RelationIncludeConfig {
    includeAll?: boolean;
    include?: { [key in keyof Partial<ModelState>]: boolean };
}