import { MissionImage } from 'src/app/shared/interfaces/models';
import { Injectable } from '@angular/core';
import { BaseMissionChildSubject } from '../abstracts/base-mission-child.subject';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class MissionImageSubject extends BaseMissionChildSubject<MissionImage> {
  constructor(
    localStorageService: LocalStorageService
    ) { super(localStorageService, 'missionImages'); }
}
