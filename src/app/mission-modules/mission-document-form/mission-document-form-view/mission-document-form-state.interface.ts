import { MissionDocument } from 'src/app/core/models';

export interface MissionDocumentFormState extends Partial<MissionDocument>{
    missionId: string;
    documentTypeName: string;
}