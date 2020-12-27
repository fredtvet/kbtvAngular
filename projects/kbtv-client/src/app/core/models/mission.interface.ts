import { MissionDocument } from './mission-document.interface';
import { MissionImage } from './mission-image.interface';
import { MissionNote } from './mission-note.interface';
import { EmployerForeign } from './relationships/employer-foreign.interface';
import { MissionTypeForeign } from './relationships/mission-type-foreign.interface';
import { ModelFile } from './base-entity-file.interface';
import { Timesheet } from './timesheet.interface';
import { IContactable } from './sub-interfaces/icontactable.interface';
import { IAddress } from './sub-interfaces/iaddress.interface';

export interface Mission extends ModelFile, EmployerForeign, MissionTypeForeign, IContactable, IAddress {
    description?: string;
    finished?: boolean;

    lastVisited?: number;
    
    missionImages?: MissionImage[];
    missionDocuments?: MissionDocument[];
    missionNotes?: MissionNote[];
    timesheets?: Timesheet[];
    userTimesheets?: Timesheet[];
};