import { Injectable, Inject } from '@angular/core';
import { MissionNote } from 'src/app/shared';
import { ApiService } from '../api.service';
import { MissionNoteSubject } from '../../subjects/mission-note.subject';
import { BaseMissionChildService } from './base-mission-child.service';
import { Observable } from 'rxjs';
import { ConnectionService } from '../connection.service';

@Injectable({
  providedIn: 'root'
})
export class MissionNoteService extends BaseMissionChildService<MissionNote> {

  constructor(
    apiService: ApiService,
    dataSubject: MissionNoteSubject,
    connectionService: ConnectionService,
  ){
    super(apiService, dataSubject, connectionService);
  }

  getByMissionId$(missionId: number):Observable<MissionNote[]>{
    this.setUrl(missionId);
    return super.getByMissionId$(missionId);
  }

  getDetails$(missionId: number, id: number):Observable<MissionNote>{
    return null;
  }

  delete$(missionId: number): Observable<boolean> {
    this.setUrl(missionId);
    return super.delete$(missionId);
  }

  setUrl(missionId: number): void{
    this.uri = `/Missions/${missionId}/MissionNotes`;
  }

  getAll$(): Observable<MissionNote[]> {return undefined}
  get$(id: number):Observable<MissionNote> {return undefined}
  add$(entity: MissionNote): Observable<MissionNote>{return undefined}
  update$(entity: MissionNote): Observable<MissionNote>{return undefined}

  //load details / full note func
}
