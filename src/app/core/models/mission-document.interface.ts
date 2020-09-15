
import { AppDocumentType } from './app-document-type.interface';
import { MissionChild } from './relationships/mission-child.interface';
import { ModelFile } from './base-entity-file.interface';
import { DocumentTypeForeign } from './relationships/document-type-foreign.interface';

export interface MissionDocument extends MissionChild, DocumentTypeForeign, ModelFile{
    id?: string  
    updatedAt?: Date;
}
