
import { AppDocumentType } from './app-document-type.interface';
import { MissionChild } from './mission-child.interface';
import { AppFile } from 'src/app/shared-app/interfaces';


export interface MissionDocument extends MissionChild, AppFile{  
    updatedAt: Date;

    documentTypeId: number;
    documentType: AppDocumentType;
}
