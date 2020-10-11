import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { WeekCriteria } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetSummary } from 'src/app/shared-timesheet/interfaces';

@Component({
  selector: 'app-user-timesheet-week-list-view',
  templateUrl: './user-timesheet-week-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetWeekListViewComponent {
  
    @Input() summaries: TimesheetSummary[];
    @Output() summaryClicked = new EventEmitter<WeekCriteria>();
    @Output() weekFilterClicked = new EventEmitter();

    trackByWeekNr(summary:TimesheetSummary): number {
        return summary.weekNr;
    }    
}
