import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { AppDocumentType, Employer, Mission, MissionDocument, Timesheet } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { BaseModelStore } from 'src/app/core/state/abstractions/base-model.store';
import { StoreState } from './store-state';
import { GetRangeWithRelationsHelper } from 'src/app/core/state/store-helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from 'src/app/core/state/store-helpers/get-with-relations.config';
import { ModelStateSlice$ } from 'src/app/core/state/model-state-slice.type';

@Injectable({
  providedIn: 'any',
})
export class MissionDocumentListStore extends BaseModelStore<StoreState>  {

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,
    private getRangeWithRelationsHelper: GetRangeWithRelationsHelper
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
  }

  getByMissionIdWithType$(id: number): Observable<MissionDocument[]>{
    return this.getRangeWithRelationsHelper.get$(
      this.stateSlice$ as ModelStateSlice$,
      new GetWithRelationsConfig("missionDocuments", null, {include: {documentTypes: true}}),
      (x: MissionDocument) => x.missionId === id
    );
  } 

  getMissionEmployer(missionId: number): Employer{
    let mission = this.arrayHelperService.find(this.getProperty<Mission[]>("missions", false), missionId, 'id');
    if(!mission?.employerId) return null;
    return this.arrayHelperService.find(this.getProperty<Employer[]>("employers", false), mission.employerId, 'id');
  }

  mailDocuments$(toEmail: string, missionDocumentIds: number[]){
    return this.apiService
              .post(`${ApiUrl.MissionDocument}/SendImages`, {toEmail, missionDocumentIds});
  }

  deleteRange$(ids: number[]): Observable<void> {
    return this.apiService.post(`${ApiUrl.MissionDocument}/DeleteRange`, {Ids: ids})    
        .pipe(
          tap(x => this._updateStateProperty(
            "missionDocuments", 
            (docs: MissionDocument[]) => this.arrayHelperService.removeRangeByIdentifier(docs, ids, 'id')))
        );   
  }
}

