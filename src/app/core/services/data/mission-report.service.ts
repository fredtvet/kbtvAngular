import { Injectable, Inject } from '@angular/core';
import { MissionReport, MissionReportType } from 'src/app/shared';
import { BaseMissionChildService } from './base-mission-child.service';
import { MissionReportSubject } from '../../subjects/mission-report.subject';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionService } from '../connection.service';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class MissionReportService extends BaseMissionChildService<MissionReport> {

  constructor(
    apiService: ApiService,
    dataSubject: MissionReportSubject,
    connectionService: ConnectionService,
    localStorageService: LocalStorageService
  ){
    super(apiService, dataSubject, connectionService, localStorageService, "/MissionReports");
  }

  getByMissionId$(missionId: number):Observable<MissionReport[]>{
    return super.getByMissionId$(missionId);
  }

  addReport$(missionId:number, reportType: MissionReportType, files: FileList): Observable<MissionReport>{
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    formData.append('MissionReportType',JSON.stringify(reportType));

    return this
            .apiService
            .post(`${this.uri}/${missionId}`,formData)
            .pipe(map(data =>{
              this.dataSubject.addOrReplace(data);
              return data;
            }));
  }

  add$(entity: MissionReport): Observable<MissionReport>{return undefined}
  update$(entity: MissionReport): Observable<MissionReport>{return undefined}
}
