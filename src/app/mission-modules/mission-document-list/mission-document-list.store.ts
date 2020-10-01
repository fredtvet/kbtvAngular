import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Employer, Mission, MissionDocument } from "src/app/core/models";
import { ObservableStore } from 'src/app/core/services/state/abstracts/observable-store';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { DeleteModelToStateHttpConverter } from 'src/app/core/services/model/converters/delete-model-to-state-http.converter';
import { StateHttpCommandHandler } from "src/app/core/services/state/state-http-command.handler";
import { StoreState } from './store-state';
import { DeleteModelStateCommand } from 'src/app/core/services/model/interfaces';
import { GetRangeWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from 'src/app/core/services/model/state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-with-relations.helper';

@Injectable({
  providedIn: 'any',
})
export class MissionDocumentListStore extends ObservableStore<StoreState>  {

  constructor(
    base: ObservableStoreBase,
    private stateHttpCommandHandler: StateHttpCommandHandler,
    private deleteStateHttpConverter: DeleteModelToStateHttpConverter<StoreState, DeleteModelStateCommand>,
    private getRangeWithRelationsHelper: GetRangeWithRelationsHelper,  
    private getWithRelationsHelper: GetWithRelationsHelper
  ) {
    super(base);
  }

  getByMissionIdWithType$(id: string): Observable<MissionDocument[]>{
    return this.stateSlice$(["missionDocuments", "employers", "documentTypes"]).pipe(map(state => {
      const relationCfg = new GetWithRelationsConfig("missionDocuments", null, {include: {documentTypes: true}})
      return this.getRangeWithRelationsHelper.get(state, relationCfg, (x: MissionDocument) => x.missionId === id);
    }))
  } 

  getMissionEmployer(missionId: string): Employer{  
    const relationCfg = new GetWithRelationsConfig("missions", null, {include: {employers: true}})
    let state = this.getStateProperties(["missions", "employers"], false);
    const employer = this.getWithRelationsHelper.get<Mission>(state, relationCfg, missionId)?.employer;
    return employer ? {...employer} : null;
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

