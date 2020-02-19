import { MissionReportType } from './mission-report-type.model';
import { MissionChild } from './mission-child.model';

export class MissionReport extends MissionChild{
  constructor(
      id: number = null,
      missionId: number = null,
      public fileURL: string = null,
      public createdAt: Date = null,
      public missionReportTypeId: number = null,
      public missionReportType: MissionReportType,
    ){ super(id, missionId)};
  }
