import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { MissionImageSubject } from '../../subjects/mission-image.subject';
import { MissionReportSubject } from '../../subjects/mission-report.subject';
import { MissionNoteSubject } from '../../subjects/mission-note.subject';
import { MissionSubject } from '../../subjects/mission.subject';
import { ConnectionService } from '../connection.service';
import { MissionDetails } from 'src/app/shared/models/mission-details.model';

@Injectable({
  providedIn: 'root'
})

export class MissionDetailsService {

  private isOnline: boolean = false;

  constructor(
    private connectionService: ConnectionService,
    private missionImageSubject: MissionImageSubject,
    private missionNoteSubject: MissionNoteSubject,
    private missionReportSubject: MissionReportSubject,
    private missionSubject: MissionSubject
  ) {
    this.connectionService.isOnline$.subscribe(res =>this.isOnline = res)
  }

  getDetails$(missionId: number): Observable<MissionDetails>{
    let missionSub = this.missionSubject.get$(missionId);
    let imageSub = this.missionImageSubject.getByMissionId$(missionId);
    let noteSub = this.missionNoteSubject.getByMissionId$(missionId);
    let reportSub = this.missionReportSubject.getByMissionId$(missionId);

    return combineLatest(missionSub, imageSub, noteSub, reportSub).pipe(map(
      ([mission, images, notes, reports]) => {
        console.log(new MissionDetails(mission, notes, images, reports));
        return new MissionDetails(mission, notes, images, reports);
    }));
  }

}
