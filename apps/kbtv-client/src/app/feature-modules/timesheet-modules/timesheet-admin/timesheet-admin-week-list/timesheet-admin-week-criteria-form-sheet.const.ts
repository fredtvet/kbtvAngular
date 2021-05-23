import { WeekCriteriaForm, WeekCriteriaFormState } from "@shared-timesheet/forms/week-criteria-controls.const";
import { FormSheetViewConfig } from "form-sheet";
import { Immutable } from "global-types";

export const TimesheetAdminWeekCriteriaFormSheet: Immutable<FormSheetViewConfig<WeekCriteriaForm, WeekCriteriaFormState>> =
{
  formConfig: {...WeekCriteriaForm, 
    options: { onlineRequired: true, noRenderDisabledControls: true },   
    disabledControls: {weekNr: true}}, 
  navConfig: {title: "Velg filtre"},
}