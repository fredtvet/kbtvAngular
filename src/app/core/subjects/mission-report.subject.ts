import { MissionReport } from 'src/app/shared';
import { Injectable } from '@angular/core';
import { BaseMissionChildSubject } from './base-mission-child.subject';
import { ReportTypeSubject } from './report-type.subject';
import { LocalStorageService } from '../services/local-storage.service';
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

  get$(id: number):Observable<MissionReport>{
      return super.get$(id).pipe(switchMap(report => {
        return this.reportTypeSubject.get$(report.missionReportType.id).pipe(map(type => {
          report.missionReportType = type;
          return report;
        }));
    }));
  }

  addOrUpdate(entity: MissionReport): void{
    if(entity.missionReportType && entity.missionReportType.id != 0)
      this.reportTypeSubject.addOrUpdate(entity.missionReportType);

    super.addOrUpdate(entity);
  }
}
