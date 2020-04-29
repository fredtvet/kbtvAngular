import { Injectable } from '@angular/core';
import { Employer, Mission, MissionType  } from 'src/app/shared/models';
import { BaseSubject } from './base.subject';
import { MissionTypeSubject } from './mission-type.subject';
import { EmployerSubject } from './employer.subject';
import { LocalStorageService } from '../services/local-storage.service';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import { switchMap, map, tap, distinctUntilChanged, skip } from 'rxjs/operators';
import { MissionImageSubject } from './mission-image.subject';
import { MissionReportSubject } from './mission-report.subject';
import { MissionNoteSubject } from './mission-note.subject';

@Injectable({
  providedIn: 'root'
})

export class MissionSubject extends BaseSubject<Mission> {

  constructor(
    private missionTypeSubject: MissionTypeSubject,
    private employerSubject: EmployerSubject,
    private missionImageSubject: MissionImageSubject,
    private missionReportSubject: MissionReportSubject,
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
      let  typeSub = this.missionTypeSubject.get$(data.missionTypeId);

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
    this.missionReportSubject.deleteByMissionId$(id);
  }

  //Add foreign objects to their subjects
  private addForeigns(entity: Mission): Mission{
    let e = entity;
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
    let missions = [...this.dataSubject.value];
    let index = missions.findIndex(x => x.id == id);
    missions[index].lastVisited = new Date();   
    this.dataSubject.next(missions);
  }
}
