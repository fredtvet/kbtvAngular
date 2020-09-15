import { MissionChild } from './relationships/mission-child.interface';
import { ModelFile } from './base-entity-file.interface';


export interface MissionImage extends MissionChild, ModelFile{
    id?: string,
    updatedAt?: Date;
}
