import { SetTimesheetCriteriaAction } from '@actions/timesheet-actions';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Timesheet } from '@core/models';
import { StateMissions, StateUserTimesheets, UserTimesheet } from '@core/state/global-state.interfaces';
import { DateRangePresets } from '@shared-app/enums/date-range-presets.enum';
import { TimesheetCriteria } from '@shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '@shared-timesheet/timesheet-filter/timesheet-filter.model';
import { TimesheetCriteriaFormState } from '@shared/constants/forms/timesheet-criteria-form.const';
import { filterRecords } from '@shared/operators/filter-records.operator';
import { Immutable, Maybe } from 'global-types';
import { RelationInclude, _getModels } from 'model/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentStore, Store } from 'state-management';
import { UserTimesheetListCriteriaQueryParam } from './user-timesheet-list-route-params.const';
import { UserTimesheetListState } from './user-timesheet-list.state';

type State = StateMissions & StateUserTimesheets;

@Injectable()
export class UserTimesheetListFacade {
    
      get criteria(){ return this.componentStore.state.timesheetCriteria; } 
      criteria$ = this.componentStore.selectProperty$("timesheetCriteria");
  
      private filteredTimesheets$ = combineLatest([
          this.store.selectProperty$("userTimesheets"),
          this.criteria$
      ]).pipe(filterRecords(TimesheetFilter), map(x => x.records));

      timesheets$: Observable<Maybe<Immutable<Timesheet>[]>> = combineLatest([
        this.filteredTimesheets$, 
        this.store.selectProperty$("missions")
      ]).pipe(
          map(([userTimesheets, missions]) =>  {
            if(!userTimesheets) return;
            const cfg: RelationInclude<State, UserTimesheet> = {prop: "userTimesheets", foreigns: ["mission"]};     
            return _getModels<State, UserTimesheet>({userTimesheets, missions: missions || []}, cfg);
          })
      );

      timesheetCriteriaFormState$: Observable<Immutable<Partial<TimesheetCriteriaFormState>>> = 
        this.store.selectProperty$("missions").pipe(
          map(x => { return { missions: x || [], users: null }})
        )

      constructor(
          private store: Store<State>,
          private componentStore: ComponentStore<UserTimesheetListState>,  
          private route: ActivatedRoute,
      ) { 
        this.setInitialCriteria(); 
      }
      
      updateCriteria = (timesheetCriteria: Immutable<Partial<TimesheetCriteria>>) => 
          this.componentStore.dispatch(<SetTimesheetCriteriaAction<UserTimesheetListState>>{ 
            type: SetTimesheetCriteriaAction, timesheetCriteria, criteriaProp: "timesheetCriteria" 
          });

      private setInitialCriteria(){
        let rawCriteria = this.route.snapshot.params[UserTimesheetListCriteriaQueryParam];

        const criteria: TimesheetCriteria = rawCriteria ? JSON.parse(rawCriteria) : {};
          
        if(criteria.dateRange && !criteria.dateRangePreset) 
          criteria.dateRangePreset = DateRangePresets.Custom
      
        this.updateCriteria(criteria);
      }
 
    
}