import { DocumentType } from './document-type.model';
import { MissionChild } from '../interfaces/mission-child.interface';
import { Mission } from './mission.model';
import { AppFile } from '../interfaces/app-file.interface';

export class MissionDocument implements MissionChild, AppFile{
  constructor(
      public id: number = null,
      public missionId: number = null,    
      public fileURL: string = null,
      public createdAt: Date = null,
      public documentTypeId: number = null,
      public documentType: DocumentType,
    ){};

  public mission: Mission = undefined;
  }
