import { MissionReportType } from './mission-report-type.model';

export class MissionReport{
    public id: number;
    public missionId: number;
    public fileURL: string;
    public createdAt: Date;
    public missionReportType: MissionReportType;
  }
