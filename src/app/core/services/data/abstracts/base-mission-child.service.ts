import { BaseService } from './base.service';
import { BaseMissionChildSubject } from './base-mission-child.subject';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { MissionChild } from 'src/app/core/models/mission-child.interface';
import { BaseSyncService } from './base-sync.service';
import { ArrayHelperService } from '../../utility/array-helper.service';
import { LocalStorageService } from '../../local-storage.service';

export abstract class BaseMissionChildService<T extends MissionChild> extends BaseSyncService<T>  {

  constructor(
    arrayHelperService: ArrayHelperService,
    localStorageService: LocalStorageService,  
    timestampKey: string,
    notificationService: NotificationService,
    apiService: ApiService,
    protected dataSubject: BaseMissionChildSubject<T>,
    deviceInfoService: DeviceInfoService,
    uri: string,
  ){
    super(arrayHelperService, localStorageService, timestampKey, notificationService, apiService, dataSubject, deviceInfoService, uri);
  }

  getByMissionId$(missionId: number):Observable<T[]>{
    return this.dataSubject.getByMissionId$(missionId);
  }

}
