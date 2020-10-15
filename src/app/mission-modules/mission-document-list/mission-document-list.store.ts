import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Employer, Mission, MissionDocument } from "src/app/core/models";
import { GetRangeWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from 'src/app/core/services/model/state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-with-relations.helper';
import { DeleteModelAction, DeleteModelStateCommand } from 'src/app/core/services/model/state/delete-model/delete-model-state-command.interface';
import { MailModelsAction, MailModelsStateCommand } from 'src/app/core/services/model/state/mail-models/mail-models-state-command.interface';
import { ObservableStore } from 'src/app/core/services/state/abstracts/observable-store';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class MissionDocumentListStore extends ObservableStore<StoreState>  {

  constructor(
    base: ObservableStoreBase,
    private commandDispatcher: CommandDispatcher,
    private getRangeWithRelationsHelper: GetRangeWithRelationsHelper,  
    private getWithRelationsHelper: GetWithRelationsHelper
  ) {
    super(base);
  }

  getByMissionIdWithType$(id: string): Observable<MissionDocument[]>{
    return this.stateSlice$(["missionDocuments", "employers", "documentTypes"]).pipe(map(state => {
      const relationCfg = new GetWithRelationsConfig("missionDocuments", null, ["documentTypes"])
      return this.getRangeWithRelationsHelper.get(state, relationCfg, (x: MissionDocument) => x.missionId === id);
    }))
  } 

  getMissionEmployer(missionId: string): Employer{  
    const relationCfg = new GetWithRelationsConfig("missions", null, ["employers"])
    let state = this.getStateProperties(["missions", "employers"], false);
    const employer = this.getWithRelationsHelper.get<Mission>(state, relationCfg, missionId)?.employer;
    return employer ? {...employer} : null;
  }

  
  delete = (command: {ids?: string[], id?: string}): void => 
    this.commandDispatcher.dispatch<DeleteModelStateCommand>({
      ...command, 
      stateProp: "missionDocuments", 
      action: DeleteModelAction
    });

  mailDocuments = (toEmail: string, ids: string[]): void => 
    this.commandDispatcher.dispatch<MailModelsStateCommand>({
      toEmail, ids, 
      stateProp: "missionDocuments",
      action: MailModelsAction 
    })
}

