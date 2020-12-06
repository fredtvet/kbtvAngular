import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mission, Timesheet } from 'src/app/core/models';
import { _getRangeWithRelations } from 'src/app/model/helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from 'src/app/model/helpers/get-with-relations.config';
import { DateRangePresets } from 'src/app/shared-app/enums';
import { TimesheetCriteriaFormState } from 'src/app/shared/constants/forms/timesheet-criteria-form.const';
import { filterRecords } from 'src/app/shared/operators/filter-records.operator';
import { ComponentStore } from 'src/app/state/component.store';
import { StateMissions, StateUserTimesheets } from 'src/app/state/interfaces';
import { Store } from 'src/app/state/store';
import { SetTimesheetCriteriaActionId } from '../../shared-timesheet/state/set-timesheet-criteria.reducer';
import { TimesheetCriteria } from '../../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { TimesheetFilter } from '../../shared-timesheet/timesheet-filter/timesheet-filter.model';
import { UserTimesheetListState } from './user-timesheet-list.state';

@Injectable()
export class UserTimesheetListFacade {
    
      get criteria(){ return this.componentStore.selectProperty<TimesheetCriteria>("timesheetCriteria"); } 
      criteria$ = this.componentStore.selectProperty$<TimesheetCriteria>("timesheetCriteria");
  
      private filteredTimesheets$: Observable<Timesheet[]> = combineLatest([
          this.store.selectProperty$<Timesheet[]>("userTimesheets"),
          this.criteria$
      ]).pipe(filterRecords(TimesheetFilter), map(x => x.records));

      timesheets$: Observable<Timesheet[]> = combineLatest([
        this.filteredTimesheets$, 
        this.store.selectProperty$<Mission[]>("missions")
      ]).pipe(
          map(([userTimesheets, missions]) =>  {
              const relationCfg = new GetWithRelationsConfig("userTimesheets", null, ["missions"]);
              return _getRangeWithRelations({userTimesheets, missions}, relationCfg);
          })
      );

      timesheetCriteriaFormState$: Observable<TimesheetCriteriaFormState> = 
        this.store.selectProperty$<Mission[]>("missions").pipe(
          map(x => { return {options: {missions: x, users: null} }})
        )

      constructor(
          private store: Store<StateMissions & StateUserTimesheets>,
          private componentStore: ComponentStore<UserTimesheetListState>,  
          private route: ActivatedRoute,
      ) { 
        this.setInitialCriteria(); 
      }
      
      updateCriteria = (timesheetCriteria: TimesheetCriteria) => 
          this.componentStore.dispatch({ actionId: SetTimesheetCriteriaActionId, timesheetCriteria });

      private setInitialCriteria(){
        let rawCriteria = this.route.snapshot.params.criteria;

        const criteria: TimesheetCriteria = rawCriteria ? JSON.parse(rawCriteria) : {};
          
        if(criteria.dateRange && !criteria.dateRangePreset) 
          criteria.dateRangePreset = DateRangePresets.Custom
      
        this.updateCriteria(criteria);
      }
 
    
}