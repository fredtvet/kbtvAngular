import { Component, OnInit } from '@angular/core';
import { MainNavService } from 'src/app/core/services';
import { AppButton } from 'src/app/shared/interfaces';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WeekListFilterSheetWrapperComponent } from '../components/week-list-filter/week-list-filter-sheet-wrapper.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-timesheet-admin-list',
  templateUrl: './timesheet-admin-list.component.html',
  styleUrls: ['./timesheet-admin-list.component.scss']
})
export class TimesheetAdminListComponent implements OnInit {

  buttons: AppButton[]

  constructor(
    private mainNavService: MainNavService,
    private _bottomSheet: MatBottomSheet) { this.configureMainNav(); }

  ngOnInit() {
    this.buttons = [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter} as AppButton];
  }

  private openWeekFilter = () => {
    let ref = this._bottomSheet.open(WeekListFilterSheetWrapperComponent, {
      data: {year: 1111}
    });

    ref.afterDismissed()
      .pipe(filter(f => f != undefined))
      .subscribe(f => console.log(f));
  }

  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Administrer timer";
    this.mainNavService.addConfig(cfg);
  }
}
