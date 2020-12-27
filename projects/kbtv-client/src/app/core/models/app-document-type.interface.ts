import { Model } from './base-entity.interface';
import { IId } from './sub-interfaces/iid.interface';
import { IName } from './sub-interfaces/iname.interface';

export interface AppDocumentType extends Model, IName, IId {};
