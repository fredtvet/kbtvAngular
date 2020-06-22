import { BaseEntity } from './base-entity.interface';

export interface InboundEmailPassword extends BaseEntity{
    password: string;
}