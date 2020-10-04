import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { Timesheet } from "src/app/core/models";
import { FilterSheetService } from 'src/app/core/services/filter/filter-sheet.service';
import { FilterConfig } from 'src/app/core/services/filter/interfaces';
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { DateRangePresets } from 'src/app/shared-app/enums';
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { TimesheetFilterViewComponent } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view.component';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { TimesheetStatus } from 'src/app/shared/enums';
import { MainTopNavConfig } from 'src/app/shared/interfaces';
import { BaseViewModel } from 'src/app/shared/interfaces/base-view-model.interface';
import { TrackByModel } from 'src/app/shared/trackby/track-by-model.helper';
import { TimesheetForm } from '../../user-timesheet-form/user-timesheet-form-view/timesheet-form.interface';
import { UserTimesheetListStore } from '../user-timesheet-list.store';

interface ViewModel extends BaseViewModel { timesheets: Timesheet[] }

@Component({
  selector: "app-user-timesheet-list",
  templateUrl: "./user-timesheet-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTimesheetListComponent implements OnInit {

  private navView$: Observable<BaseViewModel> = this.store.criteria$.pipe(
    map(criteria => { return {
      navConfig: this.getTopNavConfig(criteria),
      fabs: [
        {icon: "add", aria: 'Legg til', colorClass: 'bg-accent', 
          callback: this.openTimesheetForm,
          params: [null, {mission: criteria?.mission}]}
      ],
      chipRows: [
        {id: 1, arr: this.chipsFactory.createFilterChips(
          this.formatCriteriaChips(criteria), 
          (prop) => this.resetCriteriaProp(prop, criteria)
        )}
      ]
    }})
  )

  vm$: Observable<ViewModel> = combineLatest([this.store.filteredTimesheets$, this.navView$]).pipe(
    debounceTime(1), map(([filtered, vm]) => { return {...vm, timesheets: filtered.records}})
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filterService: FilterSheetService,
    private store: UserTimesheetListStore,
    private chipsFactory: ChipsFactoryService,
  ) {}

  ngOnInit() { 
    let initFilter = this.route.snapshot.params.initialFilter;

    const criteria: TimesheetCriteria = initFilter ? JSON.parse(initFilter) : {};
    
    if(criteria.dateRange && !criteria.dateRangePreset) 
      criteria.dateRangePreset = DateRangePresets.Custom

    this.store.addFilterCriteria(criteria);
  }

  openTimesheetForm = (entityId?: string, lockedValues?: TimesheetForm) => 
    this.router.navigate(['skjema', {config: JSON.stringify({formConfig: {entityId, viewConfig: {lockedValues}}})}], {relativeTo: this.route});

  openFilterSheet = (): void => {
    this.filterService.open<TimesheetCriteria, FilterConfig<TimesheetFilterViewConfig>>(
      {formConfig:{  
        filterConfig: {
            disabledFilters: ['user'], 
        },
        viewComponent: TimesheetFilterViewComponent
    }});
  }
  
  trackByTimesheet = TrackByModel("timesheets")

  private onBack = () => {
    let returnUrl: string = this.route.snapshot.params.returnUrl;
    if(returnUrl) this.router.navigateByUrl(returnUrl);
    else this.router.navigate(["/hjem"]);
  }

  private getTopNavConfig = (criteria: TimesheetCriteria): MainTopNavConfig => {
    let activeCriteriaCount = _getSetPropCount(criteria, {dateRangePreset:null})
    return {
      title:  "Timeliste", 
      backFn: this.onBack,     
      buttons: [{
        icon: 'filter_list', 
        callback: this.openFilterSheet,
        colorClass: (activeCriteriaCount && activeCriteriaCount > 0) ? "color-accent" : ""
      }],
    }
  }

  private resetCriteriaProp(prop: string, criteria: TimesheetCriteria){
    criteria[prop] = null;
    this.store.addFilterCriteria(criteria);
  }

  private formatCriteriaChips(criteria: TimesheetCriteria): TimesheetCriteria{
    if(!criteria) return;
    let clone = {...criteria};

    if(clone.status === TimesheetStatus.Open) clone.status = "Åpen" as any;
    else if(clone.status === TimesheetStatus.Confirmed) clone.status = "Låst" as any;
    else clone.status = null;

    return clone;
  }

}
