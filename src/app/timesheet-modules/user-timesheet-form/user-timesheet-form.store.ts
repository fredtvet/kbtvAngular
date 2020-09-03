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
import { OnStateAdd, OnStateUpdate, OnStateDelete } from "../../core/state";
import { StoreState } from './store-state';
import { TimesheetStatus } from 'src/app/shared-app/enums';
import { OptimisticModelFormStore } from 'src/app/core/state/abstractions/optimistic-model-form.store';
import { GetWithRelationsHelper } from 'src/app/core/state/store-helpers/get-with-relations.helper';
import { ModelStateSlice$ } from 'src/app/core/state/model-state-slice.type';
import { GetWithRelationsConfig } from 'src/app/core/state/store-helpers/get-with-relations.config';

@Injectable({
  providedIn: 'any',
})
export class UserTimesheetFormStore extends OptimisticModelFormStore<StoreState> implements OnStateAdd, OnStateUpdate, OnStateDelete {

  filteredMissions$ = this.stateSlice$(["userTimesheetFormMissionCriteria", "missions"]).pipe(
      map(state => {    
        const filter = new MissionFilter({searchString: state.userTimesheetFormMissionCriteria}, 100);
        return this.arrayHelperService.filter(state.missions, 
          (mission) => filter.criteria.searchString ? filter.check(mission) : filter.checkInitial(mission))
      }
  ))

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,
    private getWithRelationsHelper: GetWithRelationsHelper
  ) {
    super(arrayHelperService, apiService, "userTimesheets");
  }

  getWithMission$ = (id: number): Observable<Timesheet> => {
    return this.getWithRelationsHelper.get$(
      this.stateSlice$ as ModelStateSlice$, id, 
      new GetWithRelationsConfig("userTimesheets", null, {include: {missions: true}})
    )
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
