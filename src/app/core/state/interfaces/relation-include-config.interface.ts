import { ModelState } from '../../model/model.state';

export interface RelationIncludeConfig {
    includeAll?: boolean;
    include?: { [key in keyof Partial<ModelState>]: boolean };
}