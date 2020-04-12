
import { BaseSubject } from './base.subject';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { MissionChild } from 'src/app/shared/interfaces';

export abstract class BaseMissionChildSubject<T extends MissionChild> extends BaseSubject<T> {
  constructor(
    localStorageService: LocalStorageService,
    storageKey: string,
    ) { super(localStorageService, storageKey); }

  getByMissionId$(missionId: number): Observable<T[]>{
    return super.getBy$(x => x.missionId == missionId);
  }

  deleteByMissionId$(missionId: number): void{
    let arr = [...this.dataSubject.value];
    
    arr = arr.filter(d => {
      return d.missionId !== missionId
    });

    this.dataSubject.next(arr);
  }

}
