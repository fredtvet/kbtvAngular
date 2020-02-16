import { MissionImage } from 'src/app/shared';
import { Injectable } from '@angular/core';
import { BaseMissionChildSubject } from './base-mission-child.subject';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class MissionImageSubject extends BaseMissionChildSubject<MissionImage> {
  constructor(
    localStorageService: LocalStorageService
    ) { super(localStorageService, 'missionImages'); }
}
