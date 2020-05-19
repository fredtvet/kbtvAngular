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
          report.reportType = types.find(x => x.id === report.reportTypeId);
          return report;
        })
      }))
    }))
  }

  get$(id: number):Observable<MissionReport>{
      return super.get$(id).pipe(switchMap(report => {
        return this.reportTypeSubject.get$(report.reportTypeId).pipe(map(type => {
          report.reportType = type;
          return report;
        }));
    }));
  }

  addOrUpdate(entity: MissionReport): void{
    if(entity.reportType && entity.reportType.id != 0){
        this.reportTypeSubject.addOrUpdate(entity.reportType);
        entity.reportTypeId = entity.reportType.id;
        entity.reportType = null; //Clean up
    }
    super.addOrUpdate(entity);
  }
}
