import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserSubject } from './user.subject';
import { User } from 'src/app/core/models';
import { BaseService } from '../abstracts/base.service';
import { NotificationService } from '../../ui/notification.service';
import { DeviceInfoService } from '../../device-info.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User>{

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: UserSubject,
    deviceInfoService: DeviceInfoService) {
      super(notificationService, apiService, dataSubject, deviceInfoService, "/Users")
    }

  newPassword$(userName: string, newPassword: string): Observable<boolean>{
    return this.apiService
      .put(`${this.uri}/${userName}/NewPassword`, {newPassword, userName});
  }

  deleteRange$(ids: any[]): Observable<boolean> {throw new Error("Method not implemented.")}
  
}
