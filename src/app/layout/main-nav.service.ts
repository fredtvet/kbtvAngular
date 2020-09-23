import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, delay, map, tap } from 'rxjs/operators';
import { AuthStore } from '../core/services/auth/auth.store';
import { DeviceInfoService } from '../core/services/device-info.service';
import { AppButton } from '../shared-app/interfaces';
import { MainNavConfig } from './interfaces/main-nav-config.interface';
import { MainSideNavConfig } from './interfaces/main-side-nav-config.interface';
import { SideNavNavigations } from './side-nav-navigations';

@Injectable({
  providedIn: 'root'
})
export class MainNavService {

  private sideNavConfig$: Observable<MainSideNavConfig> = combineLatest([
    this.deviceInfoService.isOnline$, 
    this.authStore.currentUser$
    ]).pipe(
      map(([isOnline, user]) => { return {isOnline, user, navigations: SideNavNavigations} })
    );

  private configSubject =  new BehaviorSubject<MainNavConfig<any>>(null);
  
  config$: Observable<MainNavConfig<any>> = combineLatest([
    this.configSubject.asObservable(), 
    this.deviceInfoService.isXs$, 
    this.sideNavConfig$
    ]).pipe(
      debounceTime(5),
      map(([config, isXs, sideNavConfig]) => {return {...config, isXs, sideNavConfig} }),
      tap(console.log)
  );

  constructor(
    private authStore: AuthStore,
    private deviceInfoService: DeviceInfoService,) { }

  get currentFabs(): AppButton[]{
      return this.configSubject.value.fabs.slice();
  }

  getConfig(): MainNavConfig<any> { 
    if(!this.configSubject.value) return {};
    return {...this.configSubject.value} 
  }
  
  getTopNavConfig<TConfig extends Object>(): TConfig{
    if(!this.configSubject.value?.topNavConfig) return {} as TConfig;
    return {...this.configSubject.value.topNavConfig};
  }

  addConfig<TTopConfig>(cfg: MainNavConfig<TTopConfig>): void{
    this.configSubject.next(cfg);
  }

  updateConfig<TTopConfig>(cfg: Partial<MainNavConfig<TTopConfig>>){
    this.configSubject.next({...this.configSubject.value, ...cfg});
  }

  removeFabsByCallback(callbacks: Function[]){
    let mainCfg = this.getConfig();
    const signatures = callbacks.map(x => x.prototype.constructor)
    mainCfg.fabs = mainCfg.fabs?.filter(x => !signatures.includes(x.callback.prototype.constructor)); 
    this.configSubject.next(mainCfg);
  }

}
