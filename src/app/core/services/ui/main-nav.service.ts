import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainNavConfig } from 'src/app/shared/interfaces';

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
  };

  private configSubject =  new BehaviorSubject<MainNavConfig>({...this.defaultConfig});
  config$ = this.configSubject.asObservable();

  constructor() { }

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
