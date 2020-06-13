import { BaseEntity } from './base-entity.interface';

export interface Employer extends BaseEntity {
    name: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
};
