import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { MainNavConfig } from 'src/app/shared/interfaces';
import { map, tap, distinctUntilChanged, delay } from 'rxjs/operators';
import { DeviceInfoService } from '../device-info.service';

@Injectable({
  providedIn: 'root'
})

export class MainNavService {

  private defaultConfig: MainNavConfig = {
    title: null,
    multiLineTitle: null,
    subTitle: null,
    subIcon: null,   
    backFn: null,
    bottomSheetButtons: [],
    buttons: [], 
    elevationEnabled: true,
    isXs: true,
  };

  private configSubject =  new BehaviorSubject<MainNavConfig>(this.defaultConfig);
  private _config$ = this.configSubject.asObservable().pipe(distinctUntilChanged());
  
  config$: Observable<MainNavConfig> = combineLatest(this._config$, this.deviceInfoService.isXs$)
  .pipe(delay(10), //delay to fix bug where main nav not detecting config changes coming to quickly after route change
    map(([config, isXs]) => {
      let cfg = {...config};
      cfg.isXs = isXs;
      return cfg;
    })
  );

  constructor(private deviceInfoService: DeviceInfoService) { }

  getDefaultConfig(): MainNavConfig{
    return {...this.defaultConfig};
  }

  getCurrentConfig(): MainNavConfig{
    return {...this.configSubject.value};
  }

  addConfig(cfg: MainNavConfig = this.defaultConfig): void{
    this.configSubject.next(cfg);
  }

}
