import { MissionChild } from './mission-child.interface';
import { AppFile } from './app-file.interface';


export interface MissionImage extends MissionChild, AppFile{
    updatedAt: Date;
}
