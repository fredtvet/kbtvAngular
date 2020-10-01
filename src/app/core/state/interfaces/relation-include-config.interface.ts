import { ModelState } from '../../services/model/interfaces';

export interface RelationIncludeConfig {
    includeAll?: boolean;
    include?: { [key in keyof Partial<ModelState>]: boolean };
}