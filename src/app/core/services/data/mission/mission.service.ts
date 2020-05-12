import { Injectable, Inject } from '@angular/core';
import { BaseService } from '../abstracts/base.service';
import { Mission } from 'src/app/shared/models';
import { MissionSubject } from './mission.subject';
import { ApiService } from '../../api.service';
import { ConnectionService } from '../../connection.service';
import { take, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from '../../ui/notification.service';

@Injectable({
  providedIn: 'root'
})

export class MissionService extends BaseService<Mission> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    protected dataSubject: MissionSubject,
    connectionService: ConnectionService
  ){
    super(notificationService, apiService, dataSubject, connectionService, "/Missions");
  }

  getDetails$(id: number, trackHistory: boolean =  true):Observable<Mission>{
    return this.dataSubject.getDetails$(id, trackHistory);
  }

  sortByHistory(arr: Mission[]){
    let res = [...arr];
    return res.sort((a, b) => {
      return new Date(b.lastVisited || '01/01/1970').getTime() - new Date(a.lastVisited || '01/01/1970').getTime()
    });
  }

}
