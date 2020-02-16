import { Injectable } from '@angular/core';
import { Employer, Mission, MissionType  } from 'src/app/shared/models';
import { BaseSubject } from './base.subject';
import { MissionTypeSubject } from './mission-type.subject';
import { EmployerSubject } from './employer.subject';
import { LocalStorageService } from '../services/local-storage.service';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MissionSubject extends BaseSubject<Mission> {
  constructor(
    private missionTypeSubject: MissionTypeSubject,
    private employerSubject: EmployerSubject,
    localStorageService: LocalStorageService
    ) {super(localStorageService, 'missions');}

  get$(id: number):Observable<Mission>{
    return super.get$(id).pipe(switchMap(data => {
      if(data === undefined || data === null) return of(undefined);

      let employerSub: Observable<Employer>;
      if(data.employer !== null && data.employer !== undefined)
        employerSub = this.employerSubject.get$(data.employer.id);
      else employerSub = of(undefined);

      let typeSub: Observable<MissionType>;
      if(data.missionType !== null && data.missionType !== undefined)
        typeSub = this.missionTypeSubject.get$(data.missionType.id);
      else typeSub = of(undefined);

      return combineLatest(employerSub, typeSub).pipe(map(([employer, type]) => {
          data.employer = employer;
          data.missionType = type;
          return data;
      }));

  }));
  }

  addOrUpdate(entity: Mission): void{
    this.addNewForeigns(entity);
    super.addOrUpdate(entity);
  }

  update(entity: Mission): void{
    this.addNewForeigns(entity);
    super.update(entity);
  }

  private addNewForeigns(entity: Mission): void{
    if(entity.missionType && entity.missionType.id != 0)
      this.missionTypeSubject.addOrUpdate(entity.missionType);
    if(entity.employer && entity.employer.id != 0)
      this.employerSubject.addOrUpdate(entity.employer);
  }
}
