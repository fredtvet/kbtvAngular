import { Injectable } from '@angular/core';
import { MissionType  } from 'src/app/shared/models';
import { BaseSubject } from './base.subject';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class MissionTypeSubject extends BaseSubject<MissionType> {
  constructor(
    localStorageService: LocalStorageService
    ) { super(localStorageService, 'missionTypes'); }
}
