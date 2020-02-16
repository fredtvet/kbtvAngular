import { MissionReportType } from './mission-report-type.model';
import { MissionChild } from './mission-child.model';

export class MissionReport extends MissionChild{
  constructor(
      id: number = null,
      missionId: number = null,
      public fileURL: string,
      public createdAt: Date,
      public missionReportType: MissionReportType,
    ){ super(id, missionId)};
  }
