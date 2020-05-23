import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService, MainNavService, LoadingService } from 'src/app/core/services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-timesheet-admin-user-list',
  templateUrl: './timesheet-admin-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminUserListComponent implements OnInit {

  users$ = this._userService.getAll$();
  thisYear = new Date().getFullYear();
  loading$ = this._loadingService.loading$;

  constructor(
    private _loadingService: LoadingService,
    private _mainNavService: MainNavService,
    private _userService: UserService
  ) { this.configureMainNav(); }

  ngOnInit() {
  }

  private configureMainNav(){
    let cfg = this._mainNavService.getDefaultConfig();
    cfg.title = "Administrer timer";
    this._mainNavService.addConfig(cfg);
  }
}
