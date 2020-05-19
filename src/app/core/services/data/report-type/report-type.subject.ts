import { Injectable } from '@angular/core';
import { ReportType  } from 'src/app/shared/models';
import { BaseSubject } from '../abstracts/base.subject';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ReportTypeSubject extends BaseSubject<ReportType> {
  constructor(
    localStorageService: LocalStorageService
    ) { super(localStorageService, 'reportTypes'); }
}
