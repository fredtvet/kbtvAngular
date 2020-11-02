import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { TimesheetForm } from 'src/app/shared/constants/model-forms/save-user-timesheet-form.const';
import { UserTimesheetListViewModel } from './user-timesheet-list-view-model.interface';
import { UserTimesheetListFacade } from './user-timesheet-list.facade';

@Component({
  selector: "app-user-timesheet-list",
  templateUrl: "./user-timesheet-list.component.html",
  providers: [UserTimesheetListFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTimesheetListComponent {

  vm$: Observable<UserTimesheetListViewModel> = this.facade.vm$;

  constructor(private facade: UserTimesheetListFacade) {}

  openTimesheetForm = (entityId?: string, initialValue?: TimesheetForm): void => 
    this.facade.openTimesheetForm(entityId, initialValue);

  openTimesheetFilter = (): void => 
    this.facade.openTimesheetFilter();

}
