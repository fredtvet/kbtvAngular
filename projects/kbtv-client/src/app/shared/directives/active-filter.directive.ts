import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { merge, of } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { _filter } from '@array/filter.helper';
import { ActiveStringFilterConfig } from '../interfaces/active-string-filter-config.interface';
import { Immutable } from 'global-types';

@Directive({
  selector: '[appActiveStringFilter]'
})
export class ActiveStringFilterDirective<TRecord> {

    private _config: ActiveStringFilterConfig<TRecord>;
    @Input('appActiveStringFilterConfig') set config(value: ActiveStringFilterConfig<TRecord>){
        this._config = value;
        this.initalizeObserver();
    }

    private viewRef: EmbeddedViewRef<{$implicit: unknown}>;

    private searchLower: string;

    private checkCount: number = 0;

    constructor(    
        _viewContainer: ViewContainerRef,
        _template: TemplateRef<{$implicit: unknown}>) { 
        this.viewRef = _viewContainer.createEmbeddedView(_template);
    }

    private initalizeObserver(): void {
        if(!this._config) return;
        this.viewRef.context.$implicit = merge(
            of(this._config.initialString),
            this._config.stringChanges$
        ).pipe(
            filter(x => !x || typeof x === "string"), 
            debounceTime(this._config.customDebounceTime || 400), 
            map(criteria => {
                this.checkCount = 0; //reset check counter
                if(!criteria) //If no search, just take first n items
                    return this._config.maxChecks ? 
                    this._config.data?.slice(0, this._config.maxChecks) : this._config.data; 
                else {
                    this.searchLower = criteria.toLowerCase();
                    return _filter(this._config.data, this.filterRecord);
                }
        }))
    }

    private filterRecord = (record: Immutable<TRecord>): boolean => {
        if(!record) return false;
        if(this._config.maxChecks && this.checkCount >= this._config.maxChecks) return false; 
        let exp = false;
        for(var i = this._config.stringProps.length; i--;){
            const value = <string> record[this._config.stringProps[i]];
            exp = exp || value.toLowerCase().indexOf(this.searchLower) !== -1
        }
        if(exp && this._config.maxChecks) this.checkCount++;
        return exp;
    }


}
