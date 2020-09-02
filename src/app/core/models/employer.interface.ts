import { TempEntity } from './temp-entity.interface';

export interface Employer extends TempEntity {
    id: number;
    name: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
};
