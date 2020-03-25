
import { BaseSubject } from './base.subject';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { MissionChild } from 'src/app/shared/interfaces';
import { switchMap, map } from 'rxjs/operators';
import { MissionSubject } from './mission.subject';

export abstract class BaseMissionChildSubject<T extends MissionChild> extends BaseSubject<T> {
  constructor(
    private missionSubject: MissionSubject,
    localStorageService: LocalStorageService,
    storageKey: string,
    ) { super(localStorageService, storageKey); }

  getByMissionId$(missionId: number): Observable<T[]>{
    return super.getBy$(x => x.missionId == missionId);
  }

  getWithMission$(id: number): Observable<T>{
    return this.missionSubject.getAll$().pipe(switchMap(missions => {
      return this.get$(id).pipe(map(x => {
        if(x !== undefined)
          x.mission = missions.find(y => y.id == x.missionId);
        return x;
      }))
    }));   
  }

  deleteByMissionId$(missionId: number): void{
    this.dataSubject.next(
      this.dataSubject.value.filter(d => {
        return d.missionId !== missionId
      })
    );
  }

}
