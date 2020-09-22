import { MissionDocument } from './mission-document.interface';
import { MissionImage } from './mission-image.interface';
import { MissionNote } from './mission-note.interface';
import { EmployerForeign } from './relationships/employer-foreign.interface';
import { MissionTypeForeign } from './relationships/mission-type-foreign.interface';
import { ModelFile } from './base-entity-file.interface';

export interface Mission extends ModelFile, EmployerForeign, MissionTypeForeign {
    id?: string;
    phoneNumber?: string;
    description?: string;
    address?: string;
    finished?: boolean;

    fileName?: string;

    updatedAt?: string;
    lastVisited?: string;

    missionImages?: MissionImage[];
    missionDocuments?: MissionDocument[];
    missionNotes?: MissionNote[];
};