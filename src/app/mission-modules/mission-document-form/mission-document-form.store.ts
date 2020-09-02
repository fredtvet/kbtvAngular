import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { AppDocumentType, MissionDocument } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { StoreState } from './store-state';
import { BaseModelStore } from 'src/app/core/state/abstractions/base-model.store';

@Injectable({
  providedIn: 'any',
})
export class MissionDocumentFormStore extends BaseModelStore<StoreState> {

  documentTypes$ = this.property$<AppDocumentType[]>("documentTypes");

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
  }

  add$(command: {missionId: number, documentType: AppDocumentType, files: FileList}): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('file', command?.files[0], command?.files[0]?.name);
    formData.append('DocumentType',JSON.stringify(command?.documentType));

    return this.apiService.post(`${ApiUrl.MissionDocument}?missionId=${command?.missionId}`, formData)
        .pipe(
          tap(doc => this.modifyMissionDocumentWithForeigns(doc,
            (doc: MissionDocument) => this.arrayHelperService.add(this.getProperty("missionDocuments"), doc)))
        );  
  }

  //Add foreign properties (multiple properties can be created in single API call) 
  private modifyMissionDocumentWithForeigns
    (doc: MissionDocument, actionFn: (doc: MissionDocument) => MissionDocument[]): void{

    let state: Partial<StoreState> = {};
    if(doc?.documentType?.id){ 
      state.documentTypes = this.arrayHelperService.add(this.getProperty("documentTypes"), doc.documentType)
      doc.documentTypeId = doc.documentType.id;
      doc.documentType = null; //Clean up
    }
    state.missionDocuments = actionFn(doc);

    this._setStateVoid(state)
  }

}
