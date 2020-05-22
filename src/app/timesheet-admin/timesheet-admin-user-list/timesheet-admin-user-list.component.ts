import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService, MainNavService } from 'src/app/core/services';

@Component({
  selector: 'app-timesheet-admin-user-list',
  templateUrl: './timesheet-admin-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminUserListComponent implements OnInit {

  users$ = this._userService.getAll$();
  thisYear = new Date().getFullYear();

  constructor(
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
