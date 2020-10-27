import { Model } from './base-entity.interface';
import { IName } from './sub-interfaces/iname.interface';

export interface AppDocumentType extends Model, IName {
    id: string;
};
