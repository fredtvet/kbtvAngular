import { Model } from './base-entity.interface';

export interface ModelFile extends Model {
   id?: string;
   fileName?: string;
}