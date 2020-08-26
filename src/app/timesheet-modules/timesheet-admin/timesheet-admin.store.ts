import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url';
import { Timesheet, User } from 'src/app/core/models';
import { ApiService, ArrayHelperService, DateTimeService, TimesheetSummaryAggregator } from 'src/app/core/services';
import { BaseTimesheetStore, BaseTimesheetStoreSettings } from 'src/app/core/state/base-timesheet-store';
import { DateRangePresets, GroupByPeriod, TimesheetStatus } from 'src/app/shared-app/enums';
import { WeekFilterCriteria } from 'src/app/shared-timesheet/components/week-filter/week-filter-config.interface';
import { StoreState } from './store-state';

const TimesheetAdminStoreSettings: BaseTimesheetStoreSettings<StoreState> = {
    criteriaProp: "timesheetAdminCriteria", 
    groupByProp: "timesheetAdminGroupBy", 
    initialState: {timesheetAdminGroupBy: GroupByPeriod.Week}
};

@Injectable({
  providedIn: 'any'
})
export class TimesheetAdminStore extends BaseTimesheetStore<StoreState>{

    weekFilter: WeekFilterCriteria = {};

    get users(): User[] { return this.getProperty("users") }

    constructor(
        arrayHelperService: ArrayHelperService,
        apiService: ApiService,
        summaryAggregator: TimesheetSummaryAggregator,
        dateTimeService: DateTimeService,
    ){
        super(arrayHelperService, apiService, dateTimeService, summaryAggregator, TimesheetAdminStoreSettings)
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
        this.weekFilter = filter;
        // this._setStateVoid({weekFilterCriteria: filter})
        this.addCriteria({userName: filter.userName, dateRange, dateRangePreset: DateRangePresets.Custom})
    }

    changeStatus$(id: number, status: TimesheetStatus): Observable<Timesheet>{
        return this.apiService.put(`${ApiUrl.Timesheet}/${id}/Status`, {id, status})
          .pipe(tap(response => this._updateStateProperty(
                "timesheets", 
                (arr: Timesheet[]) => this.arrayHelperService.update(arr, response, "id")
              )));
    }
    
    changeStatuses$(ids: number[], status: TimesheetStatus): Observable<Timesheet[]>{
        if(ids.length == 0) throwError('Ingen ubekreftede timer');
    
        return this.apiService.put(`${ApiUrl.Timesheet}/Status`, {ids, status})
            .pipe(tap(response => this._updateStateProperty(
                "timesheets", 
                (arr: Timesheet[]) => this.arrayHelperService.addOrUpdateRange(arr, response, "id")
            )));
    }
    
}