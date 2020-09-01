import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Timesheet, User } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { MissionFilter } from 'src/app/shared/mission-filter.model';
import { OnStateAdd, OnStateUpdate, OnStateDelete, OptimisticFormStore } from "../../core/state";
import { StoreState } from './store-state';
import { TimesheetStatus } from 'src/app/shared-app/enums';

@Injectable({
  providedIn: 'any',
})
export class UserTimesheetFormStore extends OptimisticFormStore<StoreState> implements OnStateAdd, OnStateUpdate, OnStateDelete {

  filteredMissions$ = this.stateSlice$(["userTimesheetFormMissionCriteria", "missions"]).pipe(
      map(state => {    
        const filter = new MissionFilter({searchString: state.userTimesheetFormMissionCriteria}, 100);
        return this.arrayHelperService.filter(state.missions, 
          (mission) => filter.criteria.searchString ? filter.check(mission) : filter.checkInitial(mission))
      }
  ))

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, "userTimesheets");
  }

  getWithMission$ = (id: number) => {
    return this.stateSlice$(["userTimesheets", "missions"]).pipe(map(state => {
      let timesheet = this.arrayHelperService.find(state.userTimesheets, id, "id");
      console.log(timesheet);
      if(!timesheet) return timesheet;
      return {...timesheet, mission: this.arrayHelperService.find(state.missions, timesheet.missionId, "id")}
    }))
  }
 
  add$(timesheet: Timesheet): Observable<void> {
    return this._add$( 
      this.apiService.post(ApiUrl.UserTimesheet, this.getTimesheetHttpBody(timesheet)),
      this.createTempTimesheet(timesheet)
    )
  }

  update$(timesheet: Timesheet): Observable<void> {
    console.log('body', this.getTimesheetHttpBody(timesheet))
    return this._update$(
      this.apiService.put(ApiUrl.UserTimesheet + '/' + timesheet.id, this.getTimesheetHttpBody(timesheet)), 
      this.createTempTimesheet(timesheet)
    ) 
  }

  delete$ = (id: number): Observable<void> => this._delete$(id)  
  

  addMissionCriteria(criteria: string){
      this._setStateVoid({userTimesheetFormMissionCriteria: criteria})
  }

  private getTimesheetHttpBody(timesheet: Timesheet){
    return {...timesheet, 
      startTime: new Date(timesheet.startTime).getTime() / 1000, 
      endTime: new Date(timesheet.endTime).getTime() / 1000
    }
  }

  private createTempTimesheet = (timesheet: Timesheet): Timesheet => {
    return {
      ...timesheet, 
      status: TimesheetStatus.Open,
      userName: this.getProperty<User>("currentUser")?.userName,
      startTime: new Date(timesheet.startTime).toISOString(),     
      endTime: new Date(timesheet.endTime).toISOString(),
      totalHours: 
        Math.abs(
          new Date(timesheet.startTime).getTime() - 
          new Date(timesheet.endTime).getTime()
        ) / 36e5
    };
  }
  
}
