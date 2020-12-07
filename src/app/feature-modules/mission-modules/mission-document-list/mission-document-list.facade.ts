import { Host, Injectable } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { Employer, Mission, MissionDocument } from "@core/models";
import { _getRangeWithRelations } from '@model/helpers/get-range-with-relations.helper';
import { GetWithRelationsConfig } from '@model/helpers/get-with-relations.config';
import { _getWithRelations } from '@model/helpers/get-with-relations.helper';
import { DeleteModelStateCommand, DeleteModelActionId } from '@model/state/delete-model/delete-model-action.const';
import { MailModelsStateCommand, MailModelsActionId } from '@model/state/mail-models/mail-models-state-command.interface';
import { Store } from '@state/store';
import { StoreState } from './store-state';

@Injectable({providedIn: 'any'})
export class MissionDocumentListFacade  {

  constructor(private store: Store<StoreState>) { }

  getMissionDocuments$(missionId: string): Observable<MissionDocument[]> {
    return this.store.select$(["missionDocuments", "employers", "documentTypes"]).pipe(map(state => {
      const relationCfg = new GetWithRelationsConfig("missionDocuments", null, ["documentTypes"])
      return _getRangeWithRelations(state, relationCfg, (x: MissionDocument) => x.missionId === missionId);
    }))
  }

  getMissionEmployerEmail(missionId: string): string{  
    const relationCfg = new GetWithRelationsConfig("missions", null, ["employers"])
    let state = this.store.select(["missions", "employers"], false);
    const mission = _getWithRelations<Mission>(state, relationCfg, missionId);
    const email = mission?.employer?.email;
    return email;
  }

  delete = (command: {ids?: string[], id?: string}): void => 
    this.store.dispatch<DeleteModelStateCommand>({
      ...command, 
      stateProp: "missionDocuments", 
      actionId: DeleteModelActionId
    });

  mailDocuments = (toEmail: string, ids: string[]): void => 
    this.store.dispatch<MailModelsStateCommand>({
      toEmail, ids, 
      stateProp: "missionDocuments",
      actionId: MailModelsActionId 
    })
}

