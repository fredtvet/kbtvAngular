
import { AppDocumentType } from './app-document-type.interface';
import { MissionChild } from './mission-child.interface';
import { AppFile } from './app-file.interface';

export interface MissionDocument extends MissionChild, AppFile{  
    updatedAt: Date;
    documentTypeId: number;
    documentType: AppDocumentType;
}
