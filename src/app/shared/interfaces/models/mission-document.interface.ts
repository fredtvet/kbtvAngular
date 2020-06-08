import { MissionChild } from '../mission-child.interface';
import { AppFile } from '../app-file.interface';
import { AppDocumentType } from './app-document-type.interface';


export interface MissionDocument extends MissionChild, AppFile{  
    updatedAt: Date;

    documentTypeId: number;
    documentType: AppDocumentType;
}
