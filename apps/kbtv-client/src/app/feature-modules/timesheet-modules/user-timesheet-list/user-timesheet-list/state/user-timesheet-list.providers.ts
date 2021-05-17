import { Provider } from "@angular/core";
import { StateManagementModule } from "state-management";
import { UserTimesheetListFacade } from "../user-timesheet-list.facade";
import { SetUserTimesheetCriteriaReducer } from "./set-user-timesheet-criteria.reducer";

export const UserTimesheetListProviders: Provider[] = [
    UserTimesheetListFacade,
    ...StateManagementModule.forComponent({ reducers: [SetUserTimesheetCriteriaReducer]}),
]