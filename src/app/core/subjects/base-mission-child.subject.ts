
import { BaseSubject } from './base.subject';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { MissionChild } from 'src/app/shared';

export abstract class BaseMissionChildSubject<T extends MissionChild> extends BaseSubject<T> {
  constructor(
    localStorageService: LocalStorageService,
    storageKey: string
    ) { super(localStorageService, storageKey); }

  getByMissionId$(missionId: number): Observable<T[]>{
    return super.getByProperty('missionId', missionId);
  }

  deleteByMissionId$(missionId: number): void{
    this.dataSubject.next(
      this.dataSubject.value.filter(d => {
        return d.missionId !== missionId
      })
    );
  }

}
