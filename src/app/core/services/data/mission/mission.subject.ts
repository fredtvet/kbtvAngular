import { Injectable } from '@angular/core';
import { Mission } from 'src/app/shared/interfaces/models';
import { BaseSubject } from '../abstracts/base.subject';
import { MissionTypeSubject } from '../mission-type/mission-type.subject';
import { LocalStorageService } from '../../local-storage.service';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { MissionImageSubject } from '../mission-image/mission-image.subject';
import { EmployerSubject } from '../employer/employer.subject';
import { MissionDocumentSubject } from '../mission-document/mission-document.subject';
import { MissionNoteSubject } from '../mission-note/mission-note.subject';

@Injectable({
  providedIn: 'root'
})

export class MissionSubject extends BaseSubject<Mission> {

  constructor(
    private missionTypeSubject: MissionTypeSubject,
    private employerSubject: EmployerSubject,
    private missionImageSubject: MissionImageSubject,
    private missionDocumentSubject: MissionDocumentSubject,
    private missionNoteSubject: MissionNoteSubject,
    localStorageService: LocalStorageService
    ) {
      super(localStorageService, 'missions');
    }

  getAllDetails$(): Observable<Mission[]>{
    let employerSub = this.employerSubject.getAll$();
    let typeSub = this.missionTypeSubject.getAll$();

    return combineLatest(employerSub, typeSub).pipe(switchMap(data => {
      return super.getAll$().pipe(map(missions => {
        return missions.map(mission => {
          mission.employer = data[0].find(x => x.id == mission.employerId);
          mission.missionType = data[1].find(x => x.id == mission.missionTypeId);
          return mission;
        })
      }));
    }));
  }

  getDetails$(id: number, trackHistory: boolean = true):Observable<Mission>{
    if(trackHistory) this.updateLastVisited(id);
    return super.get$(id).pipe(
      switchMap(data => {
      if(data === undefined || data === null) return of(undefined);

      let employerSub = this.employerSubject.get$(data.employerId);
      let typeSub = this.missionTypeSubject.get$(data.missionTypeId);

      return combineLatest(employerSub, typeSub).pipe(map(([employer, type]) => {
          data.employer = employer;
          data.missionType = type;
          return data;
      }));

    }));
  }

  addOrUpdate(entity: Mission): void{
    let x = this.addForeigns(entity);
    super.addOrUpdate(x);
  }

  update(entity: Mission): void{
    this.addForeigns(entity);
    super.update(entity);
  }

  delete(id: number): void{
    super.delete(id);
    this.missionImageSubject.deleteByMissionId$(id);
    this.missionNoteSubject.deleteByMissionId$(id);
    this.missionDocumentSubject.deleteByMissionId$(id);
  }

  //Add foreign objects to their subjects
  private addForeigns(e: Mission): Mission{
    if(e.missionType && e.missionType.id != 0){
      this.missionTypeSubject.addOrUpdate(e.missionType);
      e.missionTypeId = e.missionType.id;
      e.missionType = null; //Clean up
    }
    if(e.employer && e.employer.id != 0){
      this.employerSubject.addOrUpdate(e.employer);
      e.employerId = e.employer.id;
      e.employer = null;//Clean up
    }
    return e;
  }

  private updateLastVisited(id: number){
    console.time('mission');
    let missions = this.dataSubject.value.slice();
    let index = missions.findIndex(x => x.id == id);
    let mission = {...missions[index]};
    mission.lastVisited = new Date(); 
    missions[index] = mission;  
    this.dataSubject.next(missions);
    
    console.timeEnd('mission');
  }
}
