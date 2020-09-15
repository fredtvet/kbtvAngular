import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthStore } from '../core/services/auth/auth.store';
import { DeviceInfoService } from '../core/services/device-info.service';
import { MainNavConfig, TopDefaultNavConfig, TopDetailNavConfig } from './main-nav-config.interface';
import { AppButton } from '../shared-app/interfaces';

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
  
  config$: Observable<MainNavConfig> = combineLatest([
    this._config$, 
    this.deviceInfoService.isXs$, 
    this.authStore.currentUser$
    ]).pipe(
      delay(10), //delay to fix bug where main nav not detecting config changes coming to quickly after route change
      map(([config, isXs, currentUser]) => {
        let cfg = {...config};
        cfg.isXs = isXs;
        cfg.currentUser = currentUser;
        return cfg;
      })
    );

  constructor(
    private authStore: AuthStore,
    private deviceInfoService: DeviceInfoService) { }

  get config(): MainNavConfig{
    return {...this.configSubject.value};
  }

  get topDefaultNavConfig(): TopDefaultNavConfig{
    return {...this.configSubject.value.topDefaultNavConfig};
  }

  get topDetailNavConfig(): TopDetailNavConfig{
    return {...this.configSubject.value.topDetailNavConfig};
  }

  get currentFabs(): AppButton[]{
    return this.configSubject.value.fabs.slice();
  }

  addConfig(topNav: {default?: TopDefaultNavConfig, detail?: TopDetailNavConfig}, fabs?: AppButton[]): void{
    let mainCfg = this.config;

    mainCfg.topDetailNavConfig = topNav.detail ? topNav.detail : null;  
    mainCfg.topDefaultNavConfig = (topNav.default && !topNav.detail) ? topNav.default : null;  
    mainCfg.fabs = fabs?.slice();

    this.configSubject.next(mainCfg);
  }

  updateConfig(topNav: {default?: TopDefaultNavConfig, detail?: TopDetailNavConfig}, fabs?: AppButton[]){
    let updatedCfg: MainNavConfig = {topDefaultNavConfig: topNav.default, topDetailNavConfig: topNav.detail}
    if(fabs) updatedCfg.fabs;
    this.configSubject.next({...this.config, ...updatedCfg})
  }

  addFabs(fabs: AppButton[]){
    let mainCfg = this.config;   
    mainCfg.fabs = mainCfg.fabs.slice().concat(fabs);
    this.configSubject.next(mainCfg);
  }

  removeFabsByIcons(icons: string[]){
    let mainCfg = this.config;
    mainCfg.fabs = mainCfg.fabs?.filter(x => !icons.includes(x.icon)); 
    this.configSubject.next(mainCfg);
  }

}
