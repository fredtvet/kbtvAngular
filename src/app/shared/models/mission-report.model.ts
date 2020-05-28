import { ReportType } from './report-type.model';
import { MissionChild } from '../interfaces/mission-child.interface';
import { Mission } from './mission.model';
import { AppFile } from '../interfaces/app-file.interface';

export class MissionReport implements MissionChild, AppFile{
  constructor(
      public id: number = null,
      public missionId: number = null,    
      public fileURL: string = null,
      public createdAt: Date = null,
      public reportTypeId: number = null,
      public reportType: ReportType,
    ){};

  public mission: Mission = undefined;
  }
