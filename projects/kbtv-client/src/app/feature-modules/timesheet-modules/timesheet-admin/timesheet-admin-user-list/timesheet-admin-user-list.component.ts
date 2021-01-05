import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models';
import { LoadingService } from '@core/services/loading.service';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetAdminWeekListCriteriaQueryParam } from '../timesheet-admin-week-list/timesheet-admin-week-list-route-params.const';
import { TimesheetAdminFacade } from '../timesheet-admin.facade';
import { TimesheetAdminUserListProviders } from './timesheet-admin-user-list-providers.const';

@Component({
  selector: 'app-timesheet-admin-user-list',
  templateUrl: './timesheet-admin-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: TimesheetAdminUserListProviders
})
export class TimesheetAdminUserListComponent {

  users$ = this.facade.users$;

  loading$ = this.loadingService.queryLoading$;

  navConfig: MainTopNavConfig = {title: 'Administrer timer'};

  constructor(
    private loadingService: LoadingService,
    private facade: TimesheetAdminFacade,
    private router: Router,
  ) {}

  goToWeekList(user: User){
    this.router.navigate(['timeadministrering/uker', {
      [TimesheetAdminWeekListCriteriaQueryParam]: JSON.stringify({user, year: new Date().getFullYear()})
    }])
  }
}
