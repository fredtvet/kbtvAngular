import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MainNavService } from 'src/app/layout';
import { MainTopNavComponent } from 'src/app/shared/components';
import { TimesheetAdminStore } from '../timesheet-admin.store';

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
    this.store.addFilterCriteria({userName, year: new Date().getFullYear()})
    this.router.navigate(["/timeadministrering/uker"]);
  }

  private configureMainNav(){
    this.mainNavService.addConfig({
      topNavComponent: MainTopNavComponent, 
      topNavConfig: {title:  "Administrer timer"}
    });
  }
}
