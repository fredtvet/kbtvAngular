import { Model } from './base-entity.interface';
import { IId } from './sub-interfaces/iid.interface';

export interface InboundEmailPassword extends Model, IId {
    password: string;
}