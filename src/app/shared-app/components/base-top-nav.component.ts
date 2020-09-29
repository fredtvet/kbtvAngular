import { ChangeDetectorRef, Directive, EventEmitter, Input } from '@angular/core';
import { TopNavComponent } from 'src/app/layout/interfaces/top-nav-component.interface';

@Directive()
export abstract class BaseTopNavComponent<TConfig> implements TopNavComponent<TConfig>{

    private _config: TConfig;

    get config(): TConfig { return this._config };

    @Input() set config(value: TConfig) {
        if(value === this._config) return;
        this._config = value;
        this.onConfigChanges(value);  
        this.changeDetectorRef.markForCheck();
    }

    toggleDrawer = new EventEmitter();

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    protected onConfigChanges(config: TConfig): void {}
}
