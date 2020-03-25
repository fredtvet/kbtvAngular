import { MissionNote } from 'src/app/shared/models';
import { Injectable } from '@angular/core';
import { BaseMissionChildSubject } from './base-mission-child.subject';
import { LocalStorageService } from '../services/local-storage.service';
import { MissionSubject } from './mission.subject';

@Injectable({
  providedIn: 'root'
})

export class MissionNoteSubject extends BaseMissionChildSubject<MissionNote> {
  constructor(
    localStorageService: LocalStorageService,
    missionSubject: MissionSubject
    ) { super(missionSubject,localStorageService, 'missionNotes'); }
}
