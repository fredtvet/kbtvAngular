import { WeekCriteriaForm, WeekCriteriaFormState } from "@shared-timesheet/forms/week-criteria-controls.const";
import { FormSheetViewConfig } from "form-sheet";
import { Immutable } from "global-types";

export const UserTimesheetWeekCriteriaFormSheet: Immutable<FormSheetViewConfig<WeekCriteriaForm, WeekCriteriaFormState>> =
{ 
    formConfig: { ...WeekCriteriaForm, options: { noRenderDisabledControls: true }, disabledControls: {user: true} },
    navConfig: {title: "Velg filtre"}, 
    fullScreen: false 
}