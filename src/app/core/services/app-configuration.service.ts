import { Injectable } from '@angular/core';
import { PersistentSubject } from '../subjects/persistent.subject';
import { LocalStorageService } from './local-storage.service';
import { tap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService extends PersistentSubject<AppConfiguration> {

  constructor(localStorageService: LocalStorageService) { 
    super(localStorageService, 'appConfiguration', {syncRefreshTime: 1000*60*30}); 
  }

  config$ = this.data$.pipe(debounceTime(500), distinctUntilChanged());

  setSyncRefreshTime = (value: number) => {
    let config = {...this.dataSubject.value};
    config.syncRefreshTime = value;
    this.dataSubject.next(config);
  }

}

export interface AppConfiguration {
  syncRefreshTime?: number;
}