import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url';
import { Timesheet } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { MissionFilter } from 'src/app/shared/mission-filter.model';
import { BaseModelStore, OnStateAdd, OnStateUpdate, OnStateDelete } from "../../core/state";
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class UserTimesheetFormStore extends BaseModelStore<StoreState> implements OnStateAdd, OnStateUpdate, OnStateDelete {

  filteredMissions$ = this.stateSlice$(["userTimesheetFormMissionCriteria", "missions"]).pipe(
      map(state => 
        this.arrayHelperService.filter(state.missions, (mission) => 
          new MissionFilter(state.userTimesheetFormMissionCriteria).check(mission))
  ))

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
  }

  get$ = (id: number) => this._getById$<Timesheet>("userTimesheets", id, "id")
 
  add$(timesheet: Timesheet): Observable<void> {
    return this.apiService.post(ApiUrl.UserTimesheet, this.getTimesheetHttpBody(timesheet))
        .pipe(tap(entity => 
            this._updateStateProperty<Timesheet[]>("userTimesheets", 
              (arr) => this.arrayHelperService.add(arr, entity))
        ));  
  }

  update$(timesheet: Timesheet): Observable<void> {
    return this.apiService.put(ApiUrl.UserTimesheet + '/' + timesheet.id, this.getTimesheetHttpBody(timesheet))
        .pipe(tap(entity => 
            this._updateStateProperty<Timesheet[]>("userTimesheets", 
                (arr) => this.arrayHelperService.update(arr, entity, "id"))
        ));  
  }

  delete$(id: number): Observable<void>{
      return this.apiService.delete(`${ApiUrl.UserTimesheet}/${id}`)
        .pipe(tap(x => 
            this._updateStateProperty<Timesheet[]>("userTimesheets",
                (arr) => this.arrayHelperService.removeByIdentifier(arr, id, "id"))
        ));  
  }

  addMissionCriteria(criteria: string){
      this._setStateVoid({userTimesheetFormMissionCriteria: criteria})
  }

  private getTimesheetHttpBody(timesheet: Timesheet){
    return {...timesheet, 
      startTime: new Date(timesheet.startTime).getTime() / 1000, 
      endTime: new Date(timesheet.endTime).getTime() / 1000
    }
  }

}
