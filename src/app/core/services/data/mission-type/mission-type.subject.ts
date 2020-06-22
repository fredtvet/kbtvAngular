import { Injectable } from '@angular/core';
import { MissionType  } from 'src/app/core/models';
import { BaseSubject } from '../abstracts/base.subject';
import { LocalStorageService } from '../../local-storage.service';
import { ArrayHelperService } from '../../utility/array-helper.service';

@Injectable({
  providedIn: 'root'
})

export class MissionTypeSubject extends BaseSubject<MissionType> {
  constructor(
    localStorageService: LocalStorageService,
    arrayHelperService: ArrayHelperService,
    ) { super('id', arrayHelperService,localStorageService, 'missionTypes'); }
}
