import { Maybe } from '@global/interfaces';
import { AppDocumentType } from '../app-document-type.interface';

export interface DocumentTypeForeign {
    documentTypeId?: string;
    documentType?: Maybe<AppDocumentType>;
}