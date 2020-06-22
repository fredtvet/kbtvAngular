import { Injectable } from '@angular/core';
import { PersistentSubject } from './data/abstracts/persistent.subject';
import { LocalStorageService } from './local-storage.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface AppConfiguration {
  syncRefreshTime?: number;
  initialNumberOfMonths?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService extends PersistentSubject<AppConfiguration> {

  constructor(localStorageService: LocalStorageService) { 
    super(localStorageService, 'appConfiguration', {syncRefreshTime: 60*30, initialNumberOfMonths: '48'}); 
  }

  config$ = this.data$.pipe(distinctUntilChanged(), map(x => {return {...x}}));
  syncRefreshTime$ = this.data$.pipe(map(x => x.syncRefreshTime), distinctUntilChanged());
  initialNumberOfMonths$ = this.data$.pipe(map(x => x.initialNumberOfMonths), distinctUntilChanged());

  updateConfig(appConfig: AppConfiguration){
    this.dataSubject.next(appConfig);
  }
}
