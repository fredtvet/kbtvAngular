import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { WeekCriteriaForm } from 'src/app/shared/constants/forms/week-criteria-controls.const';
import { GroupByPeriod } from 'src/app/shared/enums';
import { FormService } from 'src/app/shared/form';
import { TimesheetSummary, WeekCriteria } from '../../shared-timesheet/interfaces';
import { UserTimesheetListStore } from '../user-timesheet-list.store';

interface ViewModel{ summaries: TimesheetSummary[], navConfig: MainTopNavConfig  }

@Component({
  selector: 'app-user-timesheet-week-list',
  templateUrl: './user-timesheet-week-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetWeekListComponent {

  vm$: Observable<ViewModel> = combineLatest([
    this.store.timesheetSummaries$.pipe(map(x => x?.sort((a,b) => b.weekNr - a.weekNr))),
    this.store.weekCriteria$.pipe(map(x => this.getNavConfig(x)))
  ]).pipe(map(([summaries, navConfig]) => {
    return { navConfig, summaries }
  }));

  constructor(
    private formService: FormService,
    private store: UserTimesheetListStore,
    private route: ActivatedRoute,
    private router: Router) 
    { 
      this.store.addGroupBy(GroupByPeriod.Week);
      let initFilter = this.route.snapshot.params.filter;
      initFilter = initFilter ? JSON.parse(initFilter) : {year: new Date().getFullYear()};
      this.store.addWeekFilterCriteria(initFilter);
    }

  goToWeekView = (weekCriteria: WeekCriteria) => {
    this.router.navigate(['/mine-timer/ukevisning', {filter: JSON.stringify(weekCriteria)}])
  }

  openWeekFilter = (): void => { 
    this.formService.open<WeekCriteria, any>({
      formConfig: {...WeekCriteriaForm, 
        disabledControls: {weekNr: true, user: true}, 
        noRenderDisabledControls: true,  
        initialValue: this.store.weekCriteria}, 
      navConfig: {title: "Velg filtre"},
      submitCallback: (val: WeekCriteria) => this.store.addWeekFilterCriteria(val)
    });
  }

  private getNavConfig = (weekCriteria: WeekCriteria): MainTopNavConfig => {  
    const year = weekCriteria?.year; 
    return {
      title:  "Ukeliste", 
      subTitle: year ? year.toString() : "",
      buttons: [{
        icon: 'filter_list', 
        callback: this.openWeekFilter,
        color: "accent"
      }]
    }
  }
}
