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

  private historyKey: string = "missions/history"

  private missionHistory: BehaviorSubject<number[]>;

  private history$: Observable<number[]>;

  constructor(
    private missionTypeSubject: MissionTypeSubject,
    private employerSubject: EmployerSubject,
    private missionImageSubject: MissionImageSubject,
    private missionReportSubject: MissionReportSubject,
    private missionNoteSubject: MissionNoteSubject,
    localStorageService: LocalStorageService
    ) {
      super(localStorageService, 'missions');

      this.missionHistory = new BehaviorSubject<number[]>(this.localStorageService.get(this.historyKey) || []);
      this.history$ = this.missionHistory.asObservable().pipe(distinctUntilChanged());

      this.history$.pipe(skip(1)).subscribe(data => {
        this.localStorageService.add(this.historyKey, data);
      });

    }

  get$(id: number):Observable<Mission>{
    return super.get$(id).pipe(
      tap(x => this.addToHistory(x.id)),
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

  addOrReplace(entity: Mission): void{
    let x = this.addForeigns(entity);
    super.addOrReplace(x);
  }

  update(entity: Mission): void{
    this.addForeigns(entity);
    super.update(entity);
  }

  delete(id: number): void{
    console.log(id);
    super.delete(id);
    this.missionImageSubject.deleteByMissionId$(id);
    this.missionNoteSubject.deleteByMissionId$(id);
    this.missionReportSubject.deleteByMissionId$(id);
  }

  getHistory$(count: number = null){
    return this.history$.pipe(switchMap(x => {
      if(count == null) count = x.length - 1;
      return this.getRange$(x.slice(0, count))
    }))
  }

  private addToHistory(id: number){
    let arr = this.missionHistory.value;

    arr = arr.filter(x => x != id) //Remove id if already in array
    console.log(arr);
    arr.unshift(id); //Add id to start
    this.missionHistory.next(arr);
  }

  private addForeigns(entity: Mission): Mission{
    let e = entity;
    if(e.missionType && e.missionType.id != 0){
      this.missionTypeSubject.addOrReplace(e.missionType);
      e.missionTypeId = e.missionType.id;
      e.missionType = null; //Clean up
    }
    if(e.employer && e.employer.id != 0){
      this.employerSubject.addOrReplace(e.employer);
      e.employerId = e.employer.id;
      e.employer = null;//Clean up
    }
    return e;
  }
}
