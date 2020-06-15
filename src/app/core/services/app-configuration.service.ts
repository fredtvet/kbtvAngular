import { Injectable } from '@angular/core';
import { PersistentSubject } from './data/abstracts/persistent.subject';
import { LocalStorageService } from './local-storage.service';
import { distinctUntilChanged } from 'rxjs/operators';

export interface AppConfiguration {
  syncRefreshTime?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService extends PersistentSubject<AppConfiguration> {

  constructor(localStorageService: LocalStorageService) { 
    super(localStorageService, 'appConfiguration', {syncRefreshTime: 60*30}); 
  }

  config$ = this.data$.pipe(distinctUntilChanged());

  setSyncRefreshTime = (value: number) => {
    let config = {...this.dataSubject.value};
    console.log(value);
    config.syncRefreshTime = value;
    this.dataSubject.next(config);
  }

}
