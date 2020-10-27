import { Model } from './base-entity.interface';
import { IId } from './sub-interfaces/iid.interface';

export interface ModelFile extends Model, IId {
   fileName?: string;
   temp_localFileUrl?: string;
}