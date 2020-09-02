import { MissionType } from './mission-type.interface';
import { Employer } from './employer.interface';
import { TempEntity } from './temp-entity.interface';
import { MissionDocument } from './mission-document.interface';
import { MissionImage } from './mission-image.interface';
import { MissionNote } from './mission-note.interface';

export interface Mission extends TempEntity {
    id: number;
    phoneNumber?: string;
    description?: string;
    address: string;
    finished?: boolean;
    imageURL?: string;

    updatedAt?: Date;
    lastVisited?: Date;

    employerId?: number;   
    employer?: Employer;

    missionTypeId?: number;
    missionType?: MissionType;

    missionImages?: MissionImage[];
    missionDocuments?: MissionDocument[];
    missionNotes?: MissionNote[];
};