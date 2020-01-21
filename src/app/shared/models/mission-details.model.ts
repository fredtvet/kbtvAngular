import { MissionImage } from "./mission-image.model";
import { MissionReport } from "./mission-report.model";
import { Employer } from './employer.model';

export class MissionDetails {
  constructor(
    public id: number,
    public name: string,
    public phoneNumber: string,
    public description: string,
    public address: string,
    public finished: boolean,
    public employer: Employer,
    public missionType: MissionType,
    public missionNotes: MissionNote[],
    public missionImages: MissionImage[],
    public missionReports: MissionReport[],
  ){};
};

interface MissionNote{
  id: number;
  title: string;
  pinned: boolean;
  createdAt: Date;
}

interface MissionType{
  id: number;
  name: string;
}
