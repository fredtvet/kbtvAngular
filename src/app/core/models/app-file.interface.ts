import { TempEntity } from 'src/app/core/models/temp-entity.interface';

export interface AppFile extends TempEntity {
   id?: number;
   fileURL: string;
   createdAt: Date;
}