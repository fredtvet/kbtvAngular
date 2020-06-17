import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Mission } from 'src/app/core/models';
import { switchMap, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { MissionSortBy } from './mission-sort-by.enum';
import { MissionFilter } from './mission.filter';
import { MissionService } from 'src/app/core/services';

export interface MissionListViewModel{   
    missions: Mission[],
    sortBy: MissionSortBy,
    filter: MissionFilter,
}

@Injectable({
    providedIn: 'root'
})
export class MissionsFacade {

  private filterSubject = new BehaviorSubject<MissionFilter>(new MissionFilter());
  filter$ = this.filterSubject.asObservable().pipe(map(filter => this.getFilterCopy()));

  private sortBySubject = new BehaviorSubject<MissionSortBy>(MissionSortBy.UpdatedAt);
  sortBy$ = this.sortBySubject.asObservable().pipe(distinctUntilChanged());

  private missionsSubject = new BehaviorSubject<Mission[]>([]);
  missions$ = this.missionsSubject.asObservable().pipe(map(x => x.slice()));

  missionListVm$: Observable<MissionListViewModel> = combineLatest(this.missions$, this.sortBy$, this.filter$).pipe(
    map(([missions, sortBy, filter]) => {
        return  {missions: this.sortByDate(missions, sortBy), sortBy, filter}
    })
  );

  constructor(private missionService: MissionService) {

    this.filterSubject.pipe(
      filter(filter => filter !== undefined),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap(filter => this.missionService.getBy$(mission => filter.checkMission(mission))),
    ).subscribe(t => this.missionsSubject.next(t))
  }

  addFilter(filter: MissionFilter){
    this.filterSubject.next(filter);
  }

  getFilter(): MissionFilter{
    return this.getFilterCopy();
  }

  addSortBy(sortBy: MissionSortBy){
    this.sortBySubject.next(sortBy);
  }

  getSortBy(): MissionSortBy{
    return this.sortBySubject.value;
  }

  private getFilterCopy() { //Copy filter with functionality
    return Object.assign(
      Object.create(Object.getPrototypeOf(this.filterSubject.value)),
      this.filterSubject.value
    );
  }

  private sortByDate(missions: Mission[], sortBy: MissionSortBy, order: string = 'desc'){
    let arr = missions.slice();
    return arr.sort((a: any, b: any) =>{
        if(!a[sortBy]) return 1;
        if(!b[sortBy]) return -1;
        let aTime = new Date(a[sortBy]).getTime();
        let bTime = new Date(b[sortBy]).getTime();
        if(order === "asc") return aTime - bTime;
        else return bTime - aTime;
      });
  }
}