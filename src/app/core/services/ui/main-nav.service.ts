import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { MainNavConfig } from 'src/app/shared/interfaces';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

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

  private isXs$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(map(result => result.matches),shareReplay());

  private configSubject =  new BehaviorSubject<MainNavConfig>({...this.defaultConfig});
  private _config$ = this.configSubject.asObservable();
  
  config$: Observable<MainNavConfig> = combineLatest(this._config$, this.isXs$).pipe(map(([config, isXs]) => {
    let cfg = {...config};
    cfg.isXs = isXs;
    return cfg;
  }));

  constructor(private breakpointObserver: BreakpointObserver) { }

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
