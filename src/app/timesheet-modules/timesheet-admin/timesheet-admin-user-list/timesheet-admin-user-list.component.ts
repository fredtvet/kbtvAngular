import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { TimesheetAdminStore } from '../timesheet-admin.store';

@Component({
  selector: 'app-timesheet-admin-user-list',
  templateUrl: './timesheet-admin-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminUserListComponent {

  users$ = this.store.users$;
  loading$ = this.loadingService.queryLoading$;

  constructor(
    private loadingService: LoadingService,
    private store: TimesheetAdminStore,
    private router: Router,
  ) {}

  goToWeekList(userName: string){
    this.store.addFilterCriteria({userName, year: new Date().getFullYear()})
    this.router.navigate(["/timeadministrering/uker"]);
  }
}
