import { Injectable } from '@angular/core';
import { MissionNote } from 'src/app/shared/models';
import { ApiService } from '../../api.service';
import { MissionNoteSubject } from './mission-note.subject';
import { BaseMissionChildService } from '../abstracts/base-mission-child.service';
import { Observable } from 'rxjs';
import { DeviceInfoService } from '../../device-info.service';
import { map } from 'rxjs/operators';
import { NotificationService } from '../../ui/notification.service';

@Injectable({
  providedIn: 'root'
})
export class MissionNoteService extends BaseMissionChildService<MissionNote> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: MissionNoteSubject,
    deviceInfoService: DeviceInfoService
  ){
    super(notificationService, apiService, dataSubject, deviceInfoService, "/MissionNotes");
  }

  getByMissionId$(missionId: number):Observable<MissionNote[]>{
    return super.getByMissionId$(missionId).pipe(map(notes => notes.sort(function(x, y) {
      return (x.pinned === y.pinned)? 0 : x.pinned? -1 : 1;
    })));;
  }
}
