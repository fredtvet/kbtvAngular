
import { ModelFile } from './base-entity-file.interface';
import { DocumentTypeForeign } from './relationships/document-type-foreign.interface';
import { MissionChild } from './relationships/mission-child.interface';

export interface MissionDocument extends MissionChild, DocumentTypeForeign, ModelFile {}
