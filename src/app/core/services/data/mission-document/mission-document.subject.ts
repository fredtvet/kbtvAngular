import { MissionDocument } from 'src/app/core/models';
import { Injectable } from '@angular/core';
import { BaseMissionChildSubject } from '../abstracts/base-mission-child.subject';
import { DocumentTypeSubject } from '../document-type/document-type.subject';
import { LocalStorageService } from '../../local-storage.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ArrayHelperService } from '../../utility/array-helper.service';

@Injectable({
  providedIn: 'root'
})

export class MissionDocumentSubject extends BaseMissionChildSubject<MissionDocument> {
  constructor(
    private documentTypeSubject: DocumentTypeSubject,
    localStorageService: LocalStorageService,
    arrayHelperService: ArrayHelperService,
    ) { super(arrayHelperService, localStorageService, 'missionDocuments'); }

  getByMissionId$(missionId: number): Observable<MissionDocument[]>{
    return super.getByMissionId$(missionId).pipe(switchMap(documents => {
      return this.documentTypeSubject.getAll$().pipe(map(types => {
        return documents?.map(document => {
          document.documentType = types.find(x => x.id === document?.documentTypeId);
          return document;
        })
      }))
    }))
  }

  get$(id: number):Observable<MissionDocument>{
      return super.get$(id).pipe(switchMap(document => {
        return this.documentTypeSubject.get$(document.documentTypeId).pipe(map(type => {
          document.documentType = type;
          return document;
        }));
    }));
  }

  addOrUpdate(entity: MissionDocument): void{
    if(entity?.documentType?.id != 0){
        this.documentTypeSubject.addOrUpdate(entity.documentType);
        entity.documentTypeId = entity.documentType.id;
        entity.documentType = null; //Clean up
    }
    super.addOrUpdate(entity);
  }
}
