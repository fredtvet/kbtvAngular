import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { MainNavConfig, TopDefaultNavConfig, TopDetailNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { map, tap, distinctUntilChanged, delay } from 'rxjs/operators';
import { DeviceInfoService } from '../device-info.service';
import { AuthService } from '../auth/auth.service';
import { ButtonTypes } from 'src/app/shared-app/enums';

@Injectable({
  providedIn: 'root'
})

export class MainNavService {

  private defaultConfig: MainNavConfig = {
    topDefaultNavConfig: null,
    topDetailNavConfig: null,
    isXs: true,
    currentUser: null,
    fabs: []
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

  getConfig(): MainNavConfig{
    return {...this.configSubject.value};
  }

  getTopDefaultNavConfig(): TopDefaultNavConfig{
    return {...this.configSubject.value.topDefaultNavConfig};
  }

  getTopDetailNavConfig(): TopDetailNavConfig{
    return {...this.configSubject.value.topDetailNavConfig};
  }

  getCurrentFabs(): AppButton[]{
    return {...this.configSubject.value.fabs};
  }

  addConfig(topNav: {default?: TopDefaultNavConfig, detail?: TopDetailNavConfig}, fabs?: AppButton[]): void{
    let mainCfg = {...this.configSubject.value};
    mainCfg.topDetailNavConfig = topNav.detail ? topNav.detail : null;  
    mainCfg.topDefaultNavConfig = (topNav.default && !topNav.detail) ? topNav.default : null;

    mainCfg.fabs = fabs;
    mainCfg.fabs?.map(x => x.type = ButtonTypes.Fab)

    this.configSubject.next(mainCfg);
  }



}
