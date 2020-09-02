import { TempEntity } from './temp-entity.interface';

export interface InboundEmailPassword extends TempEntity{
    id: number;
    password: string;
}