import { BaseService } from './base.service';
import { BaseEntity } from 'src/app/core/models/base-entity.interface';
import { ArrayHelperService } from '../../utility/array-helper.service';
import { LocalStorageService } from '../../local-storage.service';
import { NotificationService } from '../../ui/notification.service';
import { ApiService } from '../../api.service';
import { DeviceInfoService } from '../../device-info.service';
import { DbSync } from 'src/app/shared-app/interfaces';
import { BaseSubject } from './base.subject';
import { Observable } from 'rxjs';

export abstract class BaseSyncService<T> extends BaseService<T>{

  lastSyncTimestamp: number;

  constructor(
    private arrayHelperService: ArrayHelperService,
    private localStorageService: LocalStorageService,  
    private timestampKey: string,
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: BaseSubject<T>,
    deviceInfoService: DeviceInfoService,
    uri:string,
  ) { 
    super(notificationService, apiService, dataSubject, deviceInfoService, uri);
    this.lastSyncTimestamp = this.localStorageService.get(this.timestampKey);
  }

  sync(dbSync: DbSync<T>){
    if(!dbSync) throw new Error("no sync data received.");
    let arr = this.arrayHelperService.addOrUpdateRange<T>(this.dataSubject.getAll(), dbSync.entities, 'id');
    arr = this.arrayHelperService.removeRangeByIdentifier<T>(arr, dbSync.deletedEntities, 'id');
    this.dataSubject.populate(arr);

    this.lastSyncTimestamp = dbSync.timestamp;
    this.localStorageService.add(this.timestampKey, dbSync.timestamp)//Persist timestamp for next sync
  }
  
  getAll$(): Observable<T[]>{
    return this.dataSubject.getAll$();
  }

  getAll(): T[]{
    return this.dataSubject.getAll();
  }

  getAllDetails$ (): Observable<T[]>{
    return this.dataSubject.getAllDetails$();
  }

  get$(id: number):Observable<T>{
    return this.dataSubject.get$(id);
  }

  getBy$(expression: (value: T, index?: number, Array?: any[]) => boolean): Observable<T[]>{
    return this.dataSubject.getBy$(expression);
  }

  purge = (): void => {
    this.dataSubject.purge();
    this.lastSyncTimestamp = undefined;
    this.localStorageService.add(this.timestampKey, undefined)
  } 
}
