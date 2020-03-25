import { Injectable } from '@angular/core';
import { DateParams } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public timesheetDateParams: DateParams;

  public missionId: number;

  public dataTable: string;
}
