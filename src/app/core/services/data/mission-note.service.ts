import { Injectable, Inject } from '@angular/core';
import { MissionNote } from 'src/app/shared';
import { ApiService } from '../api.service';
import { MissionNoteSubject } from '../../subjects/mission-note.subject';
import { BaseMissionChildService } from './base-mission-child.service';
import { Observable } from 'rxjs';
import { ConnectionService } from '../connection.service';
import { LocalStorageService } from '../local-storage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MissionNoteService extends BaseMissionChildService<MissionNote> {

  constructor(
    apiService: ApiService,
    dataSubject: MissionNoteSubject,
    connectionService: ConnectionService,
    localStorageService: LocalStorageService
  ){
    super(apiService, dataSubject, connectionService, localStorageService, "/MissionNotes");
  }

  getByMissionId$(missionId: number):Observable<MissionNote[]>{
    return super.getByMissionId$(missionId).pipe(map(notes => notes.sort(function(x, y) {
      return (x.pinned === y.pinned)? 0 : x.pinned? -1 : 1;
    })));;
  }
}
