import { Injectable } from '@angular/core';
import { AppDocumentType, MissionDocument } from 'src/app/core/models';
import { BaseMissionChildService } from '../abstracts/base-mission-child.service';
import { MissionDocumentSubject } from './mission-document.subject';
import { ApiService } from '../../api.service';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DeviceInfoService } from '../../device-info.service';
import { NotificationService } from '../../ui/notification.service';
import { Notifications } from 'src/app/shared-app/enums';
import { ArrayHelperService } from '../../utility/array-helper.service';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class MissionDocumentService extends BaseMissionChildService<MissionDocument> {

  constructor(
    notificationService: NotificationService,
    apiService: ApiService,
    dataSubject: MissionDocumentSubject,
    deviceInfoService: DeviceInfoService,
    arrayHelperService: ArrayHelperService,
    localStorageService: LocalStorageService,  
  ){
    super(arrayHelperService, localStorageService, 'MissionDocumentTimestamp', notificationService, 
      apiService, dataSubject, deviceInfoService, "/MissionDocuments");
  }

  addDocument$(missionId:number, documentType: AppDocumentType, files: FileList): Observable<MissionDocument>{ 
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
    return this.apiService
              .post(`${this.uri}/SendDocuments`, {toEmail, missionDocumentIds});
  }


  add$(entity: MissionDocument): Observable<MissionDocument>{throw new Error("Method not implemented.")}
  update$(entity: MissionDocument): Observable<MissionDocument>{throw new Error("Method not implemented.")}
}