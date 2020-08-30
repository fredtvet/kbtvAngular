import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Mission, Timesheet } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService,

  DateTimeService,
  TimesheetSummaryAggregator
} from "src/app/core/services";
import { DateRangePresets, GroupByPeriod } from 'src/app/shared-app/enums';
import { WeekFilterCriteria } from 'src/app/shared-timesheet/components/week-filter/week-filter-config.interface';
import { TimesheetFilter } from 'src/app/shared/timesheet-filter.model';
import { BaseModelStore } from "../../core/state";
import { StoreState } from './store-state';
import { TimesheetCriteria, TimesheetSummary } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'any',
})
export class UserTimesheetListStore extends BaseModelStore<StoreState>  {

  private _weekFilter: WeekFilterCriteria;
  
  get weekFilter(): WeekFilterCriteria { return {...this._weekFilter} };

  get criteria(){return this.getProperty<TimesheetCriteria>("userTimesheetListCriteria") || {}} 

  groupBy$ = this.property$<GroupByPeriod>("userTimesheetListGroupBy");

  criteria$ = this.property$<TimesheetCriteria>("userTimesheetListCriteria");

  filteredTimesheets$: Observable<Timesheet[]> = 
    this.stateSlice$(["userTimesheets", "userTimesheetListCriteria", "missions"]).pipe(
          filter(x => x.userTimesheets != null && x.userTimesheetListCriteria != null),
          map(state => {
              const filter = new TimesheetFilter(state.userTimesheetListCriteria);
              let arr = this.arrayHelperService.filter(state.userTimesheets, (t: Timesheet) => filter.check(t));
              return this.addMissionToTimesheet(arr, state.missions)   
          }),       
      );

  timesheetSummaries$: Observable<TimesheetSummary[]> = 
      combineLatest(
          this.filteredTimesheets$, 
          this.groupBy$
      ).pipe(
          filter(([timesheets]) => timesheets != null),
          map(([timesheets, groupBy]) => this.timesheetSummaryAggregator.groupByType(groupBy, timesheets)),
      );


  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,
    private timesheetSummaryAggregator: TimesheetSummaryAggregator,
    private dateTimeService: DateTimeService
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
  }

  addWeekFilter(filter: WeekFilterCriteria): void{
    let dateRange: Date[];

    if(filter?.weekNr) 
        dateRange = this.dateTimeService.getWeekRange(this.dateTimeService.getDateOfWeek(filter.weekNr, filter.year));
    else if(filter?.year){
        let date = new Date();
        date.setFullYear(filter.year);
        dateRange = this.dateTimeService.getYearRange(date);
    }
    this._weekFilter = filter;
    // this._setStateVoid({weekFilterCriteria: filter})
    this.addCriteria({dateRange, dateRangePreset: DateRangePresets.Custom})
  }

  addCriteria(criteria: TimesheetCriteria){
    if(criteria?.dateRangePreset === undefined)
      criteria.dateRangePreset = DateRangePresets.Custom;
    else if(criteria?.dateRangePreset !== DateRangePresets.Custom)
      criteria.dateRange = this.dateTimeService.getRangeByDateRangePreset(criteria.dateRangePreset);

    this._setStateVoid({userTimesheetListCriteria: criteria});
  }

  addGroupBy(type: GroupByPeriod){
    this._setStateVoid({userTimesheetListGroupBy: type});
  }

  delete$(id: number): Observable<void>{
    return this.apiService.delete(`${ApiUrl.UserTimesheet}/${id}`)
      .pipe(tap(x => 
          this._updateStateProperty<Timesheet[]>("userTimesheets", 
              (arr) => this.arrayHelperService.removeByIdentifier(arr, id, "id"))
      ));  
  }

  private addMissionToTimesheet(timesheets: Timesheet[], missions: Mission[]): Timesheet[]{
    const missions_obj = {}; 
    missions?.forEach(x => missions_obj[x.id] = x); 
    timesheets?.forEach(t => t.mission = missions_obj[t.missionId]);  
    return timesheets;
  }


}

