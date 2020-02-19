import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { Mission } from 'src/app/shared';
import { MissionSubject } from '../../subjects/mission.subject';
import { ApiService } from '../api.service';
import { ConnectionService } from '../connection.service';
import { take, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class MissionService extends BaseService<Mission> {

  constructor(
    apiService: ApiService,
    dataSubject: MissionSubject,
    connectionService: ConnectionService,
    localStorageService: LocalStorageService
  ){
    super(apiService, dataSubject, connectionService, localStorageService, "/Missions");
  }

  getFiltered$(finished:boolean = false, searchString?: string): Observable<Mission[]>{
    return this.dataSubject.data$.pipe(map(arr => {
      if(searchString !== null)
        return arr.filter(x => x.address.includes(searchString) && x.finished == !finished);
      else
        return arr.filter(x => x.finished == !finished);
    }))
  }

}
