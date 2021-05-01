import { DateRangePresets } from "@shared-app/enums/date-range-presets.enum";
import { TimesheetCriteriaForm, TimesheetCriteriaFormState } from "@shared/constants/forms/timesheet-criteria-form.const";
import { _getISO, _getMonthRange } from "date-time-helpers";
import { DynamicForm } from "dynamic-forms";
import { FormServiceConfig } from "form-sheet";
import { Immutable } from "global-types";
import { Converter } from "model/form";
import { Observable } from "rxjs";
import { TimesheetCriteria } from "./timesheet-filter/timesheet-criteria.interface";

const _criteriaFormToTimesheetCriteria : Converter<TimesheetCriteriaForm, TimesheetCriteria> =
    ({customMonthISO, ...rest}) => {
        if(customMonthISO && rest.dateRangePreset === DateRangePresets.CustomMonth)
            rest.dateRange = _getMonthRange(customMonthISO, true);
            
        return rest
    } 

const _timesheetCriteriaToForm : Converter<TimesheetCriteria, TimesheetCriteriaForm> =
    ({dateRange, ...rest}) => {        
        return {
            ...rest,
            dateRange,
            customMonthISO: (dateRange && rest.dateRangePreset === DateRangePresets.CustomMonth) ? 
                _getISO(dateRange.start) : null
        }
    }

export function _timesheetCriteriaFormSheetFactory(cfg: {
    onSubmit: (t: Immutable<TimesheetCriteria>) => void,
    initialValue?: Immutable<TimesheetCriteria>, 
    formState$?: Observable<Immutable<TimesheetCriteriaFormState>>,
    customForm?: Omit<DynamicForm<TimesheetCriteriaForm, TimesheetCriteriaFormState>, "controls" | "initialValue">,
}): Immutable<FormServiceConfig<TimesheetCriteriaForm, TimesheetCriteriaFormState>> {
    return {
        formConfig: { ...TimesheetCriteriaForm, ...(cfg.customForm || {}),
            initialValue: cfg.initialValue ? _timesheetCriteriaToForm(cfg.initialValue) : null }, 
        formState: cfg.formState$,
        navConfig: {title: "Velg filtre"},
        submitCallback: (val) => cfg.onSubmit(_criteriaFormToTimesheetCriteria(val))
      }
}

