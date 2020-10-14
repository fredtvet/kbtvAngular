import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Timesheet } from "src/app/core/models";
import { FilterSheetService } from 'src/app/core/services/filter/filter-sheet.service';
import { FilterConfig } from 'src/app/core/services/filter/interfaces';
import { ModelFormService } from 'src/app/core/services/model/form/model-form.service';
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { DateRangePresets } from 'src/app/shared-app/enums';
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { AppButton } from 'src/app/shared-app/interfaces';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { TimesheetFilterViewConfig } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view-config.interface';
import { TimesheetFilterViewComponent } from 'src/app/shared-timesheet/components/timesheet-filter-view/timesheet-filter-view.component';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetStatus } from 'src/app/shared/enums';
import { TimesheetForm } from '../user-timesheet-form-view/timesheet-form.interface';
import { UserTimesheetFormToSaveModelAdapter } from '../user-timesheet-form-view/user-timesheet-form-to-save-model.adapter';
import { UserTimesheetFormViewComponent } from '../user-timesheet-form-view/user-timesheet-form-view.component';
import { UserTimesheetListStore } from '../user-timesheet-list.store';

interface ViewModel { timesheets: Timesheet[], fabs?: AppButton[], chips?: AppChip[], navConfig?: MainTopNavConfig  }

@Component({
  selector: "app-user-timesheet-list",
  templateUrl: "./user-timesheet-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTimesheetListComponent implements OnInit {

  private navView$: Observable<Partial<ViewModel>> = this.store.criteria$.pipe(
    map(criteria => { return {
      navConfig: this.getTopNavConfig(criteria),
      fabs: [
        {icon: "add", aria: 'Legg til', color: 'accent', 
          callback: this.openTimesheetForm,
          params: [null, {mission: criteria?.mission}]}
      ],
      chips: this.chipsFactory.createFilterChips(
          this.formatCriteriaChips(criteria), 
          (prop) => this.resetCriteriaProp(prop, criteria)
        )
    }})
  )

  vm$: Observable<ViewModel> = combineLatest([this.store.filteredTimesheets$, this.navView$]).pipe(
    map(([filtered, vm]) => { return {...vm, timesheets: filtered.records}})
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filterService: FilterSheetService,
    private store: UserTimesheetListStore,
    private chipsFactory: ChipsFactoryService,
    private modelFormService: ModelFormService
  ) {}

  ngOnInit() { 
    let filter = this.route.snapshot.params.filter;

    const criteria: TimesheetCriteria = filter ? JSON.parse(filter) : {};
    
    if(criteria.dateRange && !criteria.dateRangePreset) 
      criteria.dateRangePreset = DateRangePresets.Custom

    this.store.addFilterCriteria(criteria);
  }

  openTimesheetForm = (entityId?: string, lockedValues?: TimesheetForm): void => {
    this.modelFormService.open({formConfig: {
      viewComponent: UserTimesheetFormViewComponent, 
      adapter: UserTimesheetFormToSaveModelAdapter, 
      stateProp: "userTimesheets",
      entityId, 
      viewConfig: {lockedValues}
    }})
  };

  openFilterSheet = (): void => {
    this.filterService.open<TimesheetCriteria, FilterConfig<TimesheetFilterViewConfig>>(
      {formConfig:{  
        filterConfig: {
            disabledFilters: ['user'], 
        },
        viewComponent: TimesheetFilterViewComponent
    }});
  }


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
        color: (activeCriteriaCount && activeCriteriaCount > 0) ? "accent" : null
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
