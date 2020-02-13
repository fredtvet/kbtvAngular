import { Injectable, Inject } from '@angular/core';
import { MissionReport, MissionReportType } from 'src/app/shared';
import { BaseMissionChildService } from './base-mission-child.service';
import { MissionReportSubject } from '../../subjects/mission-report.subject';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionService } from '../connection.service';

@Injectable({
  providedIn: 'root'
})

export class MissionReportService extends BaseMissionChildService<MissionReport> {

  constructor(
    apiService: ApiService,
    dataSubject: MissionReportSubject,
    connectionService: ConnectionService,
  ){
    super(apiService, dataSubject, connectionService);
  }

  getByMissionId$(missionId: number):Observable<MissionReport[]>{
    this.setUrl(missionId);
    return super.getByMissionId$(missionId);
  }

  delete$(missionId: number): Observable<boolean> {
    this.setUrl(missionId);
    return super.delete$(missionId);
  }

  addReport$(missionId:number, reportType: MissionReportType, files: FileList): Observable<MissionReport>{
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    formData.append('MissionReportType',JSON.stringify(reportType));

    return this
            .apiService
            .post(`${this.uri}/${missionId}/MissionReports`,formData)
            .pipe(map(data =>{
              this.dataSubject.addOrUpdate(data);
              return data;
            }));
  }

  setUrl(missionId: number): void{
    this.uri = `/Missions/${missionId}/MissionReports`;
  }

  getAll$(): Observable<MissionReport[]> {return undefined}
  get$(id: number):Observable<MissionReport> {return undefined}
  add$(entity: MissionReport): Observable<MissionReport>{return undefined}
  update$(entity: MissionReport): Observable<MissionReport>{return undefined}
}
