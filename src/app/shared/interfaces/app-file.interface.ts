import { BaseEntity } from './models/base-entity.interface';

export interface AppFile extends BaseEntity {
   fileURL: string;
   createdAt: Date;
}