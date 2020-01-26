import { MissionImage } from "./mission-image.model";
import { MissionReport } from "./mission-report.model";

import { Mission } from './mission.model';
import { MissionNote } from './mission-note.model';

export class MissionDetails {
  constructor(
    public mission: Mission  = new Mission(),
    public missionNotes: MissionNote[] = [],
    public missionImages: MissionImage[] = [],
    public missionReports: MissionReport[] = [],
  ){};
};
