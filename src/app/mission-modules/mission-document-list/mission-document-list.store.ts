import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { DeleteModelStateCommand } from 'src/app/core/model/interfaces';
import { GetRangeWithRelationsHelper } from 'src/app/core/model/state-helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from 'src/app/core/model/state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from 'src/app/core/model/state-helpers/get-with-relations.helper';
import { Employer, Mission, MissionDocument } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { DeleteModelToStateHttpConverter } from 'src/app/core/services/model/converters/delete-model-to-state-http.converter';
import { StateHttpCommandHandler } from 'src/app/core/services/state/state-http-command.handler';
import { BaseStore } from 'src/app/core/state/abstracts/base.store';
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class MissionDocumentListStore extends BaseStore<StoreState>  {

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,
    private stateHttpCommandHandler: StateHttpCommandHandler,
    private deleteStateHttpConverter: DeleteModelToStateHttpConverter<StoreState, DeleteModelStateCommand>,
    private getRangeWithRelationsHelper: GetRangeWithRelationsHelper<StoreState>,  
    private getWithRelationsHelper: GetWithRelationsHelper<StoreState>
  ) {
    super(arrayHelperService, apiService);
  }

  getByMissionIdWithType$(id: string): Observable<MissionDocument[]>{
    return this.stateSlice$(["missionDocuments", "employers", "documentTypes"]).pipe(map(state => {
      const relationCfg = new GetWithRelationsConfig("missionDocuments", null, {include: {documentTypes: true}})
      return this.getRangeWithRelationsHelper.get(state, relationCfg, (x: MissionDocument) => x.missionId === id);
    }))
  } 

  getMissionEmployer(missionId: string): Employer{  
    const relationCfg = new GetWithRelationsConfig("missions", null, {include: {employers: true}})
    let state = this.getProperties(["missions", "employers"]);
    return this.getWithRelationsHelper.get<Mission>(state, relationCfg, missionId)?.employer
  }

  delete = (command: DeleteModelStateCommand): void => 
    this.stateHttpCommandHandler.dispatch(this.deleteStateHttpConverter.convert({...command, stateProp: "missionDocuments"}));

  mailDocuments(toEmail: string, ids: string[]){
    this.stateHttpCommandHandler.dispatch({
      httpBody:{toEmail, ids},
       httpMethod: "POST", 
       apiUrl:`${ApiUrl.MissionDocument}/SendDocuments`
    })
  }
}

