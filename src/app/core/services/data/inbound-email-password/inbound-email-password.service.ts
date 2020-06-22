import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InboundEmailPassword } from 'src/app/core/models';
import { ApiService } from '../../api.service';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { BaseService } from '../abstracts/base.service';
import { InboundEmailPasswordSubject } from './inbound-email-password.subject';

@Injectable({
  providedIn: 'root'
})
export class InboundEmailPasswordService extends BaseService<InboundEmailPassword> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: InboundEmailPasswordSubject,
    deviceInfoService: DeviceInfoService) {
      super(notificationService, apiService, dataSubject, deviceInfoService, "/InboundEmailPassword")
  }

  update$(entity: InboundEmailPassword): Observable<InboundEmailPassword> {throw new Error("Method not implemented.")}

  delete$(id: any): Observable<boolean> {throw new Error("Method not implemented.")}
}
