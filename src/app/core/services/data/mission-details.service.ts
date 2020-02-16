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

  private detailsLoaded: number[] = [];
  private uri: string;
  private isOnline: boolean = false;

  constructor(
    private apiService: ApiService,
    private connectionService: ConnectionService,
    private missionImageSubject: MissionImageSubject,
    private missionNoteSubject: MissionNoteSubject,
    private missionReportSubject: MissionReportSubject,
    private missionSubject: MissionSubject
  ) {
    this.connectionService.isOnline$.subscribe(res =>this.isOnline = res)
  }

  getDetails$(missionId: number): Observable<MissionDetails>{
    if(!this.hasDetailsLoaded(missionId) && this.isOnline)
      this.loadDetails$(missionId);

    return this.combineDetails$(missionId);
  }

  private loadDetails$(id: number): void{
    this.setUrl(id);
    this.apiService.get(`${this.uri}`)
      .subscribe(details => {
        this.populateSubjects(details);
        this.detailsLoaded.push(details.mission.id);
      });
  }

  private populateSubjects(details: MissionDetails){
    this.missionSubject.addOrUpdate(details.mission);
    this.missionImageSubject.addOrUpdateRange(details.missionImages);
    this.missionNoteSubject.addOrUpdateRange(details.missionNotes);
    this.missionReportSubject.addOrUpdateRange(details.missionReports);
  }

  private combineDetails$(missionId: number):Observable<MissionDetails>{
    let missionSub = this.missionSubject.get$(missionId);
    let imageSub = this.missionImageSubject.getByMissionId$(missionId);
    let noteSub = this.missionNoteSubject.getByMissionId$(missionId);
    let reportSub = this.missionReportSubject.getByMissionId$(missionId);

    return combineLatest(missionSub, imageSub, noteSub, reportSub).pipe(map(
      ([mission, images, notes, reports]) => {
        return new MissionDetails(mission, notes, images, reports);
    }));
  }

  private hasDetailsLoaded(missionId:number): boolean{
    let res = this.detailsLoaded.find(x => x == missionId);
    if(res == undefined) return false;
    else return true;
  }

  private setUrl(missionId: number): void{
    this.uri = `/Missions/${missionId}/Details`;
  }
}
