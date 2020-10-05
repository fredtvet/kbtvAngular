import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetAdminStore } from '../timesheet-admin.store';

@Component({
  selector: 'app-timesheet-admin-user-list',
  templateUrl: './timesheet-admin-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminUserListComponent {

  users$ = this.store.users$;
  loading$ = this.loadingService.queryLoading$;
  navConfig: MainTopNavConfig = {title: 'Administrer timer'};

  constructor(
    private loadingService: LoadingService,
    private store: TimesheetAdminStore,
    private router: Router,
  ) {
    this.store.addFilterCriteria(null);
  }

  goToWeekList(user: User){
    this.router.navigate(['timeadministrering/uker', {
      filter: JSON.stringify({user, year: new Date().getFullYear()})
    }])
  }
}
