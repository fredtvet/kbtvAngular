import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { Mission } from 'src/app/shared';
import { MissionSubject } from '../../subjects/mission.subject';
import { ApiService } from '../api.service';
import { ConnectionService } from '../connection.service';
import { take, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MissionService extends BaseService<Mission> {

  constructor(
    apiService: ApiService,
    dataSubject: MissionSubject,
    connectionService: ConnectionService,
  ){
    super(apiService, dataSubject, connectionService);
    this.uri = "/Missions";
  }

  loadLatestMissions(){ //Fetches missions newer than latest mission in cache
    if(!this.isOnline) return null;
    let missions = this.dataSubject.getAll();
    let from: Date;

    if(missions.length == 0) from = null;
    else from = missions[0].createdAt;

    this.apiService
      .get(`${this.uri}/Range?FromDate=${from}`)
      .subscribe(data => this.dataSubject.addOrUpdateRange(data, true));
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
