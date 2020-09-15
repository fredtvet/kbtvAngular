import { Model } from './base-entity.interface';

export interface InboundEmailPassword extends Model{
    id: string;
    password: string;
}