import { Model, Timesheet } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { DataFilter } from '@shared/data.filter';
import { DateRange } from 'date-time-helpers';
import { DateInput, Immutable, Maybe, Prop, UnknownState } from 'global-types';
import { ForeignRelation, ModelConfig, _getModel, _getModelConfig } from 'model/core';
import { TimesheetCriteria } from './timesheet-criteria.interface';

export class TimesheetFilter extends DataFilter<Timesheet, TimesheetCriteria>{

    private modelConfig: ModelConfig<ModelState, Timesheet>;

    constructor(criteria: Immutable<TimesheetCriteria>, maxChecks?: number){ 
        super(criteria, maxChecks);
        this.modelConfig = _getModelConfig<ModelState, Timesheet>("timesheets")
    }

    protected addChecks(record: Immutable<Timesheet>): boolean {
        let exp = true;
        if(!this.criteria.dateRange) return false;
        if(this.criteria.status){
            exp = exp && record.status === this.criteria.status;
        }
        if(this.criteria.user?.userName)
            exp = exp && record.userName === this.criteria.user.userName;

        if(this.criteria.dateRange.start && this.criteria.dateRange.end) {
            if(!record.startTime) return false;
            let startTime = this.getStartOfDayTime(record.startTime);
            exp = exp && startTime >= this.getStartOfDayTime(this.criteria.dateRange.start) 
                && startTime <= this.getStartOfDayTime(this.criteria.dateRange.end); 
        }
    
        if(this.criteria.mission) 
            exp = exp && record.missionId === this.criteria.mission.id;  
    
        return exp
    }

    //Check if criteria is contained in base, meaning all potential timesheets has already been fetched. 
    containedIn(baseCriteria: Immutable<TimesheetCriteria>): boolean{
        if(!this.criteria) return true;
        if(!baseCriteria) return false;
        if(!this.isDateRangeContainedIn(baseCriteria.dateRange)) return false;
        for(const prop in baseCriteria){
            if(prop === "dateRange" || prop === "dateRangePreset") continue;
            const baseValue = <UnknownState> baseCriteria[<Prop<Immutable<TimesheetCriteria>>> prop];
            if(!baseValue) continue; 
            const value =  <UnknownState> this.criteria[<Prop<Immutable<TimesheetCriteria>>> prop];
            if(value && typeof value === "object") {
                if(!this.isObjectContainedIn(baseValue, <Prop<Immutable<TimesheetCriteria>>> prop)) 
                    return false;
            }
            else if(value !== baseValue) return false;     
        }
        return true;
    }
    
    private isObjectContainedIn(baseValue: Immutable<UnknownState>, prop: Prop<TimesheetCriteria>): boolean{
        const fkRel = <ForeignRelation<ModelState, Timesheet, "user" | "mission">> (<UnknownState>this.modelConfig.foreigns)[prop];
        const modelCfg = _getModelConfig<ModelState, Model>(fkRel.stateProp);
        const value = <UnknownState> this.criteria[prop];

        if(modelCfg && value[<string> modelCfg.idProp] !== baseValue[<string> modelCfg.idProp]) 
            return false

        if(!modelCfg && value !== baseValue) return false;
        
        return true
    }

    private isDateRangeContainedIn(baseDateRange: Maybe<Immutable<DateRange>>): boolean{
        if(!baseDateRange || !baseDateRange.end || !baseDateRange.start) return false; //No range means all, in which it will always be contained. 
        const dateRange = this.criteria.dateRange;
        if(!dateRange || !dateRange.start || !dateRange.end) return true; 
        return (this.getStartOfDayTime(baseDateRange.start) <= this.getStartOfDayTime(dateRange.start)) && 
        (this.getStartOfDayTime(baseDateRange.end) >= this.getStartOfDayTime(dateRange.end))
    }

    private getStartOfDayTime(date: Immutable<DateInput>): number{
        const newDate = new Date(date as Date);
        newDate.setHours(0,0,0,0);
        return newDate.getTime();
    }

};