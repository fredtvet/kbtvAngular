import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { AuthStore } from '../core/services/auth/auth.store';
import { DeviceInfoService } from '../core/services/device-info.service';
import { AppButton } from '../shared-app/interfaces';
import { TopNavConfig } from '../shared/interfaces';
import { MainNavConfig } from './interfaces/main-nav-config.interface';
import { SideNavNavigations } from './side-nav-navigations';

@Injectable({
  providedIn: 'root'
})
export class MainNavService {

  private configSubject =  new BehaviorSubject<MainNavConfig<any>>(null);
  
  config$: Observable<MainNavConfig<TopNavConfig>> = combineLatest([
    this.configSubject.asObservable(), 
    this.deviceInfoService.isXs$, 
    this.authStore.currentUser$,
    this.deviceInfoService.isOnline$, 
    ]).pipe(
      debounceTime(5),//currently needed to detect changes coming to fast
      map(([config, isXs, user, isOnline]) => {
        return {...config, isXs, sideNavConfig: {user, isOnline, navigations: SideNavNavigations}} 
      }),
  );

  constructor(
    private authStore: AuthStore,
    private deviceInfoService: DeviceInfoService,) { }

  get currentFabs(): AppButton[]{
      return this.configSubject.value.fabs.slice();
  }

  getConfig(): MainNavConfig<TopNavConfig> { 
    if(!this.configSubject.value) return {};
    return {...this.configSubject.value} 
  }
  
  getTopNavConfig<TConfig extends TopNavConfig>(): TConfig {
    if(!this.configSubject.value?.topNavConfig) return {} as TConfig;
    return {...this.configSubject.value.topNavConfig};
  }

  getFabs(): AppButton[]{
    if(!this.configSubject.value?.fabs) return []; 
    return [...this.configSubject.value.fabs];
  }

  addConfig<TTopConfig extends TopNavConfig>(cfg: MainNavConfig<TTopConfig>): void{
    this.configSubject.next(cfg);
  }

  updateConfig<TTopConfig extends TopNavConfig>(cfg: Partial<MainNavConfig<TTopConfig>>){
    this.configSubject.next({...this.configSubject.value, ...cfg});
  }

  removeFabsByCallback(callbacks: Function[]){
    let mainCfg = this.getConfig();
    const signatures = callbacks.map(x => x.prototype.constructor)
    mainCfg.fabs = mainCfg.fabs?.filter(x => !signatures.includes(x.callback.prototype.constructor)); 
    this.configSubject.next(mainCfg);
  }

}
