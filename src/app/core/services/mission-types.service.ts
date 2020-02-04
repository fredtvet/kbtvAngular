import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MissionType } from 'src/app/shared';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MissionTypesSubject } from '../subjects/mission-types.subject';

@Injectable({
  providedIn: 'root'
})

export class MissionTypesService {

  uri : String = '/MissionTypes';

  constructor(
    private apiService: ApiService,
    private missionTypesSubject: MissionTypesSubject) {}

  getAll$(): Observable<MissionType[]> {
    if(this.missionTypesSubject.isEmpty()){
      return this.apiService.get(`${this.uri}`)
        .pipe(switchMap(data => {
          this.missionTypesSubject.populate(data);
          return this.missionTypesSubject.missionTypes$;
        }));
    }
    else return this.missionTypesSubject.missionTypes$;
  }

  add$(missionType: MissionType): Observable<MissionType>
  {
    return this.apiService
      .post(`${this.uri}`, missionType)
      .pipe(map(data => {
        this.missionTypesSubject.add(data);
        return data;
      }));
  }

  update$(missionType: MissionType): Observable<MissionType>
  {
    return this.apiService.put(`${this.uri}/${missionType.id}`, missionType)
      .pipe(map(data => {
        this.missionTypesSubject.update(data);
        return data;
      }));
  }

  delete$(id: number): Observable<boolean> {
    return this
      .apiService
      .delete(`${this.uri}/${id}`)
      .pipe(map(bool =>{
        if(bool) this.missionTypesSubject.delete(id);
        return bool;
      }));
  }
}
