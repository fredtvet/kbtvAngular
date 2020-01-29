import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MissionType } from 'src/app/shared';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MissionTypesService {

  uri : String = '/MissionTypes';

  private missionTypesSubject =
          new BehaviorSubject<MissionType[]>([]);

  private missionTypes$ = this.missionTypesSubject.asObservable();

  constructor(private apiService: ApiService) {}

  addMissionType(missionType: MissionType)
  {
    return this.apiService
                .post(`${this.uri}`, missionType)
                .pipe(map(data =>{
                  this.addMissionTypeInSubject(data);
                }));

  }

  getMissionTypes(): Observable<MissionType[]> {
    if(this.missionTypesSubject.value === undefined || this.missionTypesSubject.value.length == 0){
      return this.apiService.get(`${this.uri}`)
        .pipe(switchMap(data => {
          this.missionTypesSubject.next(data);
          return this.missionTypes$;
        }));
    }
    else return this.missionTypes$;
  }

  updateMissionType(missionType: MissionType)
  {
    return this.apiService.put(`${this.uri}/${missionType.id}`, missionType)
      .pipe(map(e => this.updateMissionTypeInSubject(e)));
  }

  deleteMissionType(id: number) {
    return this
            .apiService
            .delete(`${this.uri}/${id}`)
            .pipe(map(bool =>{
              if(bool)
                this.removeMissionTypeInSubject(id);
              return bool;
            }));
  }

  removeMissionTypeInSubject(id: number){
    this.missionTypesSubject.next(
      this.missionTypesSubject.value.filter(d => {
        return d.id !== id
      })
    );
  }

  updateMissionTypeInSubject(missionType: MissionType){
    this.missionTypesSubject.next(
      this.missionTypesSubject.value.map(m => {
        if(m.id !== missionType.id) return m;
        else return missionType;
      })
    );
  }

  addMissionTypeInSubject(missionType: MissionType){
    if(!this.missionTypesSubject.value.find(type => type.id == missionType.id))
      this.missionTypesSubject.value.push(missionType);

    console.log(this.missionTypesSubject.value);
  }
}
