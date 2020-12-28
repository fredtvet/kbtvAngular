import { Maybe } from 'global-types';
import { AppDocumentType } from '../app-document-type.interface';

export interface DocumentTypeForeign {
    documentTypeId?: string;
    documentType?: Maybe<AppDocumentType>;
}