import { MissionReportType } from './mission-report-type.model';
import { MissionChild } from '../interfaces/mission-child.interface';

export class MissionReport implements MissionChild{
  constructor(
      public id: number = null,
      public missionId: number = null,
      public fileURL: string = null,
      public createdAt: Date = null,
      public missionReportTypeId: number = null,
      public missionReportType: MissionReportType,
    ){};
  }
