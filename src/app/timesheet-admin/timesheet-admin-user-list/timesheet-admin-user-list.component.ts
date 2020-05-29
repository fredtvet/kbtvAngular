import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService, MainNavService, LoadingService } from 'src/app/core/services';
import { map } from 'rxjs/operators';
import { TopDefaultNavConfig } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-timesheet-admin-user-list',
  templateUrl: './timesheet-admin-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminUserListComponent implements OnInit {

  users$ = this.userService.getAll$();
  thisYear = new Date().getFullYear();
  loading$ = this.loadingService.loading$;

  constructor(
    private loadingService: LoadingService,
    private mainNavService: MainNavService,
    private userService: UserService
  ) { this.configureMainNav(); }

  ngOnInit() {
  }

  private configureMainNav(){
    let cfg = {title: "Administrer timer"} as TopDefaultNavConfig;
    this.mainNavService.addTopNavConfig({default: cfg});
  }
}
