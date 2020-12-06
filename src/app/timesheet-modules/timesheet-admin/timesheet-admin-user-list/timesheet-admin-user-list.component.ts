import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
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
      criteria: JSON.stringify({user, year: new Date().getFullYear()})
    }])
  }
}
