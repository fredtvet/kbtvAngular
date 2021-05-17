import { SetTimesheetCriteriaAction } from "@actions/timesheet-actions";
import { Injectable } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { StateMissions, StateUsers } from "@core/state/global-state.interfaces";
import { DateRangePresets } from "@shared-app/enums/date-range-presets.enum";
import { TimesheetCriteriaForm, UserTimesheetCriteriaForm } from "@shared-timesheet/forms/timesheet-criteria-form.const";
import { _getISO, _getMonthRange } from "date-time-helpers";
import { FormService } from "form-sheet";
import { Immutable, Prop } from "global-types";
import { Converter } from "model/form";
import { map } from "rxjs/operators";
import { Store } from "state-management";
import { StateSyncConfig } from "state-sync";
import { _noEmployersFilter } from "./no-employers-filter.helper";
import { TimesheetCriteria } from "./timesheet-filter/timesheet-criteria.interface";

const _criteriaFormToTimesheetCriteria : Converter<UserTimesheetCriteriaForm, TimesheetCriteria> =
    ({customMonthISO, ...rest}) => {
        if(customMonthISO && rest.dateRangePreset === DateRangePresets.CustomMonth)
            rest.dateRange = _getMonthRange(customMonthISO, true);
            
        return <TimesheetCriteria> rest
    } 

const _timesheetCriteriaToForm : Converter<TimesheetCriteria, UserTimesheetCriteriaForm> =
    ({dateRange, ...rest}) => {        
        return {
            ...rest,
            dateRange,
            customMonthISO: (dateRange && rest.dateRangePreset === DateRangePresets.CustomMonth) ? 
                _getISO(dateRange.start) : null
        }
    }

@Injectable({providedIn: "any"})
export class TimesheetCriteriaFormService { 

    constructor(
        private formService: FormService,
        private store: Store<StateMissions & StateUsers>
    ){}

    open(onSubmit: (t: Immutable<TimesheetCriteria>) => void, initialValue?: Immutable<TimesheetCriteria>): MatBottomSheetRef {
        return this.formService.open({
            formConfig: { ...TimesheetCriteriaForm,
                initialValue: initialValue ? _timesheetCriteriaToForm(initialValue) : null }, 
            formState: this.store.select$(["missions", "users"]).pipe(
                map(state => { return { ...state, users: _noEmployersFilter(state.users) }})),
            navConfig: {title: "Velg filtre"},
            submitCallback: (val) => onSubmit(_criteriaFormToTimesheetCriteria(val))
        })
    }
}

@Injectable({providedIn: "any"})
export class UserTimesheetCriteriaFormSheet {
    constructor(
        private formService: FormService,
        private store: Store<StateMissions & StateSyncConfig>
    ){}

    open(onSubmit: (t: Immutable<TimesheetCriteria>) => void, initialValue?: Immutable<TimesheetCriteria>): MatBottomSheetRef {
        return this.formService.open({
            formConfig: { ...UserTimesheetCriteriaForm, 
                initialValue: initialValue ? _timesheetCriteriaToForm(initialValue) : null }, 
            formState: this.store.select$(["missions", "syncConfig"]),
            navConfig: {title: "Velg filtre"},
            submitCallback: (val) => onSubmit(_criteriaFormToTimesheetCriteria(val))
        })
    }
}