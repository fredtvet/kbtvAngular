import { Injectable } from '@angular/core';
import { AppDocumentType } from 'src/app/core/models';
import { ApiService } from '../../api.service';
import { DocumentTypeSubject } from './document-type.subject';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { BaseSyncService } from '../abstracts/base-sync.service';
import { ArrayHelperService } from '../../utility/array-helper.service';
import { LocalStorageService } from '../../local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService extends BaseSyncService<AppDocumentType> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: DocumentTypeSubject,
    deviceInfoService: DeviceInfoService,
    arrayHelperService: ArrayHelperService,
    localStorageService: LocalStorageService,  
  ){
    super(arrayHelperService, localStorageService, 'DocumentTypeTimestamp',
      notificationService, apiService, dataSubject, deviceInfoService, "/DocumentTypes")
  }

}
