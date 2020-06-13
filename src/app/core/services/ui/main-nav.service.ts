import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { MainNavConfig, TopDefaultNavConfig, TopDetailNavConfig } from 'src/app/shared-app/interfaces';
import { map, tap, distinctUntilChanged, delay } from 'rxjs/operators';
import { DeviceInfoService } from '../device-info.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class MainNavService {

  private defaultConfig: MainNavConfig = {
    topDefaultNavConfig: null,
    topDetailNavConfig: null,
    isXs: true,
    currentUser: null
  };

  private configSubject =  new BehaviorSubject<MainNavConfig>(this.defaultConfig);
  private _config$ = this.configSubject.asObservable().pipe(distinctUntilChanged());
  
  config$: Observable<MainNavConfig> = combineLatest(
    this._config$, 
    this.deviceInfoService.isXs$, 
    this.authService.currentUser$
    ).pipe(
      delay(10), //delay to fix bug where main nav not detecting config changes coming to quickly after route change
      map(([config, isXs, currentUser]) => {
        let cfg = {...config};
        cfg.isXs = isXs;
        cfg.currentUser = currentUser;
        return cfg;
      })
    );

  constructor(
    private authService: AuthService,
    private deviceInfoService: DeviceInfoService) { }

  getTopDefaultNavConfig(): TopDefaultNavConfig{
    return {...this.configSubject.value.topDefaultNavConfig};
  }

  getTopDetailNavConfig(): TopDetailNavConfig{
    return {...this.configSubject.value.topDetailNavConfig};
  }

  addTopNavConfig(options: {default?: TopDefaultNavConfig, detail?: TopDetailNavConfig}): void{
    let mainCfg = {...this.configSubject.value};
    mainCfg.topDetailNavConfig = options.detail ? options.detail : null;  
    mainCfg.topDefaultNavConfig = (options.default && !options.detail) ? options.default : null;
    this.configSubject.next(mainCfg);
  }

}
