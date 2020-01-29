import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MissionType, MissionReportType } from 'src/app/shared';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MissionReportTypesService {

  uri : String = '/MissionReportTypes';

  private missionReportTypesSubject =
          new BehaviorSubject<MissionReportType[]>([]);

  private missionReportTypes$ = this.missionReportTypesSubject.asObservable();

  constructor(private apiService: ApiService) {}

  addMissionReportType(missionReportType: MissionReportType)
  {
    return this.apiService
                .post(`${this.uri}`, missionReportType)
                .pipe(map(data =>{
                  this.addMissionReportTypeInSubject(data);
                }));

  }

  getMissionReportTypes(): Observable<MissionReportType[]> {
    if(this.missionReportTypesSubject.value === undefined || this.missionReportTypesSubject.value.length == 0){
      return this.apiService.get(`${this.uri}`)
        .pipe(switchMap(data => {
          this.missionReportTypesSubject.next(data);
          return this.missionReportTypes$;
        }));
    }
    else return this.missionReportTypes$;
  }

  updateMissionReportType(missionReportType: MissionReportType)
  {
    return this.apiService.put(`${this.uri}/${missionReportType.id}`, missionReportType)
      .pipe(map(e => this.updateMissionReportTypeInSubject(e)));
  }

  deleteMissionReportType(id: number) {
    return this
            .apiService
            .delete(`${this.uri}/${id}`)
            .pipe(map(bool =>{
              if(bool)
                this.removeMissionReportTypeInSubject(id);
              return bool;
            }));
  }

  removeMissionReportTypeInSubject(id: number){
    this.missionReportTypesSubject.next(
      this.missionReportTypesSubject.value.filter(d => {
        return d.id !== id
      })
    );
  }

  updateMissionReportTypeInSubject(missionReportType: MissionReportType){
    this.missionReportTypesSubject.next(
      this.missionReportTypesSubject.value.map(m => {
        if(m.id !== missionReportType.id) return m;
        else return missionReportType;
      })
    );
  }

  addMissionReportTypeInSubject(missionReportType: MissionReportType){
    if(!this.missionReportTypesSubject.value.find(type => type.id == missionReportType.id))
      this.missionReportTypesSubject.value.push(missionReportType);
  }
}
