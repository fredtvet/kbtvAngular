import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { Mission } from 'src/app/shared';
import { MissionSubject } from '../../subjects/mission.subject';
import { ApiService } from '../api.service';
import { ConnectionService } from '../connection.service';
import { take, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';

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

  getFiltered$(showFinished:boolean = true, searchString?: string): Observable<Mission[]>{
    return this.dataSubject.getAll$().pipe(map(arr => {

      if(!showFinished)
        arr = arr.filter(x => x.finished == false);

      if(searchString !== null || searchString !== undefined)
        arr = arr.filter(x => x.address.toLowerCase().includes(searchString.toLowerCase()));

      return arr;
    }))
  }

  getHistory$(count: number = null){
    return this.dataSubject.getHistory$(count);
  }

}
