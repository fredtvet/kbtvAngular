
import { BaseSubject } from './base.subject';
import { MissionChild } from 'src/app/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';

export abstract class BaseMissionChildSubject<T extends MissionChild> extends BaseSubject<T> {
  constructor(
    localStorageService: LocalStorageService,
    storageKey: string
    ) { super(localStorageService, storageKey); }

  getByMissionId$(missionId: number): Observable<T[]>{
    return this.data$.pipe(map(arr => arr.filter(e => e.missionId == missionId)));
  }

  deleteByMissionId$(missionId: number): void{
    this.dataSubject.next(
      this.dataSubject.value.filter(d => {
        return d.missionId !== missionId
      })
    );
  }

}
