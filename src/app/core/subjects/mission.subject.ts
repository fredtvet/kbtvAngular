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

  getAll$(): Observable<Mission[]>{
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
    return this.history$.pipe(switchMap(ids => {
      if(count == null) count = ids.length - 1;
      return this.getRange$(ids.slice(0, count))
        .pipe(map(data => this.sortHistory(data, ids)))
    }))
  }

  private sortHistory(missions: Mission[], ids: number[]){
    let order = {};

    ids.forEach(function (a, i) { order[a] = i; });

    missions.sort(function (a, b) {
      return order[a.id] - order[b.id];
    });

    return missions;
  }

  private addToHistory(id: number){
    let arr = this.missionHistory.value;

    arr = arr.filter(x => x != id) //Remove id if already in array
    arr.unshift(id); //Add id to start
    console.log(arr);
    this.missionHistory.next(arr);
  }

  //Add foreign objects to their subjects
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
