import { Injectable, Inject } from '@angular/core';
import { Employer } from 'src/app/shared/models';
import { BaseService } from './base.service';
import { ApiService } from '../api.service';
import { EmployerSubject } from '../../subjects/employer.subject';
import { ConnectionService } from '../connection.service';
import { LocalStorageService } from '../local-storage.service';


@Injectable({
  providedIn: 'root'
})

export class EmployerService extends BaseService<Employer> {

  constructor(
    apiService: ApiService,
    dataSubject: EmployerSubject,
    connectionService: ConnectionService,
    localStorageService: LocalStorageService
  ){
    super(apiService, dataSubject, connectionService, localStorageService, "/Employers");
  }

}
