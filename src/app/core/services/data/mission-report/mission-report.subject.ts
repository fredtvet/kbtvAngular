import { MissionReport } from 'src/app/shared/models';
import { Injectable } from '@angular/core';
import { BaseMissionChildSubject } from '../abstracts/base-mission-child.subject';
import { ReportTypeSubject } from '../report-type/report-type.subject';
import { LocalStorageService } from '../../local-storage.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MissionReportSubject extends BaseMissionChildSubject<MissionReport> {
  constructor(
    private reportTypeSubject: ReportTypeSubject,
    localStorageService: LocalStorageService
    ) { super(localStorageService, 'missionReports'); }

  getByMissionId$(missionId: number): Observable<MissionReport[]>{
    return super.getByMissionId$(missionId).pipe(switchMap(reports => {
      return this.reportTypeSubject.getAll$().pipe(map(types => {
        return reports.map(report => {
          report.missionReportType = types.find(x => x.id === report.missionReportTypeId);
          return report;
        })
      }))
    }))
  }

  get$(id: number):Observable<MissionReport>{
      return super.get$(id).pipe(switchMap(report => {
        return this.reportTypeSubject.get$(report.missionReportTypeId).pipe(map(type => {
          report.missionReportType = type;
          return report;
        }));
    }));
  }

  addOrUpdate(entity: MissionReport): void{
    if(entity.missionReportType && entity.missionReportType.id != 0){
        this.reportTypeSubject.addOrUpdate(entity.missionReportType);
        entity.missionReportTypeId = entity.missionReportType.id;
        entity.missionReportType = null; //Clean up
    }
    super.addOrUpdate(entity);
  }
}