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

  private detailsLoaded: number[] = [];

  constructor(
    apiService: ApiService,
    dataSubject: MissionNoteSubject,
    connectionService: ConnectionService,
  ){
    super(apiService, dataSubject, connectionService);
  }

  getByMissionId$(missionId: number):Observable<MissionNote[]>{
    return super.getByMissionId$(missionId);
  }

  getDetails$(id: number):Observable<MissionNote>{
    this.setUrl();
    if(!this.hasDetailsLoaded(id))
      super.get$(id).subscribe(x => this.detailsLoaded.push(x.id));

    return this.dataSubject.get$(id);
  }

  delete$(id: number): Observable<boolean> {
    this.setUrl();
    return super.delete$(id);
  }

  setUrl(missionId: number = null): void{
    if(missionId !== null) this.uri = `/Missions/${missionId}/MissionNotes`;
    else this.uri = `/Missions/MissionNotes/`;
  }

  private hasDetailsLoaded(missionId:number): boolean{
    let res = this.detailsLoaded.find(x => x == missionId);
    if(res == undefined) return false;
    else return true;
  }

  getAll$(): Observable<MissionNote[]> {return undefined}
  get$(id: number):Observable<MissionNote> {return undefined}
  add$(entity: MissionNote): Observable<MissionNote>{return undefined}
  update$(entity: MissionNote): Observable<MissionNote>{return undefined}

  //load details / full note func
}
