import { Model } from './base-entity.interface';

export interface Employer extends Model {
    id?: string;
    name: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
};
