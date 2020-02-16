import { Injectable } from '@angular/core';
import { MissionReportType  } from 'src/app/shared/models';
import { BaseSubject } from './base.subject';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ReportTypeSubject extends BaseSubject<MissionReportType> {
  constructor(
    localStorageService: LocalStorageService
    ) { super(localStorageService, 'reportTypes'); }
}
