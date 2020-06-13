import { MissionChild } from './mission-child.interface';
import { AppFile } from 'src/app/shared-app/interfaces';


export interface MissionImage extends MissionChild, AppFile{
    updatedAt: Date;
}
