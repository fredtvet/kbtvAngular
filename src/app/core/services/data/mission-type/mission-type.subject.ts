import { Injectable } from '@angular/core';
import { MissionType  } from 'src/app/shared/interfaces/models';
import { BaseSubject } from '../abstracts/base.subject';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class MissionTypeSubject extends BaseSubject<MissionType> {
  constructor(
    localStorageService: LocalStorageService
    ) { super(localStorageService, 'missionTypes'); }
}
