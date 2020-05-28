import { BaseEntity } from './base-entity.interface';

export interface AppFile extends BaseEntity {
   fileURL: string;
   createdAt: Date;
}