import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MainNavService, TimesheetService, JsonToCsvExportService, TranslationService } from 'src/app/core/services';
import { TopDefaultNavConfig, TimesheetFilter, TimesheetSummary } from 'src/app/shared-app/interfaces';
import { GroupByTypes } from 'src/app/shared-app/enums';
import { TimesheetFilterSheetWrapperComponent } from '../../shared-timesheet/components/timesheet-filter-sheet-wrapper.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-timesheet-statistic',
  templateUrl: './timesheet-statistic.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetStatisticComponent {
  groupByTypes = GroupByTypes;

  filter$ = this.timesheetService.filter$;
  groupBy$ = this.timesheetService.groupBy$;
  timesheetSummaries$ = this.timesheetService.timesheetSummaries$.pipe(tap(x => this.summaries = x));
  private summaries = []; //Private store for using with layout service

  constructor(
    private mainNavService: MainNavService,
    private timesheetService: TimesheetService,
    private bottomSheet: MatBottomSheet,
    private jsonToCsvExportService: JsonToCsvExportService
    ) { 
      this.configureMainNav();
    }
    
  changeGroupingType = (type: GroupByTypes) => this.timesheetService.addGroupBy(type);
  
  openBottomSheet(f: TimesheetFilter): void {
    let ref = this.bottomSheet.open(TimesheetFilterSheetWrapperComponent, {
      data: {filter: f, disabledFilters: ['status']}
    });

    ref.afterDismissed()
      .pipe(filter(x => x !== null && x !== undefined))
      .subscribe(x => this.timesheetService.addFilter(x));
  }

  private exportSummariesToCsv = () => {
    if(!this.summaries || this.summaries.length === 0) return undefined;  
    var ignoredProperties = {timesheets: true, userName: true};
    var objects: Object[] = [];
    for(var d = 0; d < this.summaries.length; d++){
      var clone = {...this.summaries[d]};
      Object.getOwnPropertyNames(ignoredProperties).forEach(x => delete clone[x]);
      objects.push(clone);
    }
    this.jsonToCsvExportService.exportJsonToCsv$(objects).subscribe(x => console.log(x))
  }

  private configureMainNav(){
    let cfg = {
      title:  "Timestatistikk",
      bottomSheetButtons: [{icon: "import_export", text: "Eksporter timer til CSV", callback: this.exportSummariesToCsv}]
    } as TopDefaultNavConfig;
    
    this.mainNavService.addTopNavConfig({default: cfg});
  }
}
