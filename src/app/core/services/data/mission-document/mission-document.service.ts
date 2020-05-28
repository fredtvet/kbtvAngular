import { Injectable, Inject } from '@angular/core';
import { MissionDocument, DocumentType } from 'src/app/shared/models';
import { BaseMissionChildService } from '../abstracts/base-mission-child.service';
import { MissionDocumentSubject } from './mission-document.subject';
import { ApiService } from '../../api.service';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { Notifications } from 'src/app/shared/enums';

@Injectable({
  providedIn: 'root'
})

export class MissionDocumentService extends BaseMissionChildService<MissionDocument> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: MissionDocumentSubject,
    deviceInfoService: DeviceInfoService
  ){
    super(notificationService, apiService, dataSubject, deviceInfoService, "/MissionDocuments");
  }

  addDocument$(missionId:number, documentType: DocumentType, files: FileList): Observable<MissionDocument>{
    if(!this.isOnline)
    return throwError('Du må være tilkoblet internett for å legge til rapporter.')
            .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    formData.append('DocumentType',JSON.stringify(documentType));

    return this
            .apiService
            .post(`${this.uri}?missionId=${missionId}`,formData)
            .pipe(map(data =>{
              this.dataSubject.addOrUpdate(data);
              return data;
            }));
  }

  mailDocuments$(toEmail: string, missionDocumentIds: number[]){
    if(!this.isOnline)
    return throwError('Du må være tilkoblet internett for å sende epost.')
            .pipe(tap(next => {}, error => this.notificationService.setNotification(error, Notifications.Error)));

    return this.apiService
              .post(`${this.uri}/SendDocuments`, {toEmail, missionDocumentIds});
  }


  add$(entity: MissionDocument): Observable<MissionDocument>{return undefined}
  update$(entity: MissionDocument): Observable<MissionDocument>{return undefined}
}
