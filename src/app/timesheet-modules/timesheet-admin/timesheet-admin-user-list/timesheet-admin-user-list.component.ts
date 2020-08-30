import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { TimesheetAdminStore } from '../timesheet-admin.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-admin-user-list',
  templateUrl: './timesheet-admin-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminUserListComponent implements OnInit {

  users$ = this.store.users$;
  loading$ = this.loadingService.queryLoading$;

  constructor(
    private loadingService: LoadingService,
    private mainNavService: MainNavService,
    private store: TimesheetAdminStore,
    private router: Router,
  ) {}

  ngOnInit() {
    this.configureMainNav(); 
  }

  goToWeekList(userName: string){
    this.store.addWeekFilter({userName, year: new Date().getFullYear()})
    this.router.navigate(["/timeadministrering/uker"]);
  }

  private configureMainNav(){
    let cfg = {title: "Administrer timer"} as TopDefaultNavConfig;
    this.mainNavService.addConfig({default: cfg});
  }
}
