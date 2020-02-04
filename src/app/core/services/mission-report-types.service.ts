import { Injectable } from '@angular/core';
import { MissionReportType } from 'src/app/shared';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MissionReportTypesSubject } from '../subjects/mission-report-types.subject';

@Injectable({
  providedIn: 'root'
})

export class MissionReportTypesService {

  uri : String = '/MissionReportTypes';

  constructor(
    private apiService: ApiService,
    private missionReportTypesSubject: MissionReportTypesSubject) {}

  getAll$(): Observable<MissionReportType[]> {
      if(this.missionReportTypesSubject.isEmpty()){
        return this.apiService.get(`${this.uri}`)
          .pipe(switchMap(data => {
            this.missionReportTypesSubject.populate(data);
            return this.missionReportTypesSubject.missionReportTypes$;
          }));
      }
      else return this.missionReportTypesSubject.missionReportTypes$;
  }

  add$(missionReportType: MissionReportType): Observable<MissionReportType>
  {
    return this.apiService
      .post(`${this.uri}`, missionReportType)
      .pipe(map(data =>{
        this.missionReportTypesSubject.add(data);
        return data;
      }));
  }

  update$(missionReportType: MissionReportType): Observable<MissionReportType>
  {
    return this.apiService.put(`${this.uri}/${missionReportType.id}`, missionReportType)
      .pipe(map(data => {
        this.missionReportTypesSubject.update(data);
        return data
      }));
  }

  delete$(id: number): Observable<boolean> {
    return this
      .apiService
      .delete(`${this.uri}/${id}`)
      .pipe(map(bool =>{
        if(bool) this.missionReportTypesSubject.delete(id);
        return bool;
      }));
  }
}
