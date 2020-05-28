import { Injectable } from '@angular/core';
import { DocumentType } from 'src/app/shared/models';
import { BaseService } from '../abstracts/base.service';
import { ApiService } from '../../api.service';
import { DocumentTypeSubject } from './document-type.subject';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';


@Injectable({
  providedIn: 'root'
})

export class DocumentTypeService extends BaseService<DocumentType> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: DocumentTypeSubject,
    deviceInfoService: DeviceInfoService
  ){
    super(notificationService, apiService, dataSubject, deviceInfoService, "/DocumentTypes");
  }

}
