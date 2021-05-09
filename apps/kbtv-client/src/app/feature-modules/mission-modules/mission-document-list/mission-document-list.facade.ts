import { Injectable } from "@angular/core";
import { Mission, MissionDocument } from "@core/models";
import { ModelState } from '@core/state/model-state.interface';
import { _filter } from "array-helpers";
import { ImmutableArray, Maybe } from 'global-types';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Store } from 'state-management';
import { DeleteModelAction } from 'model/state-commands';
import { RelationInclude, _getModel } from 'model/core';
import { StoreState } from './store-state';
import { MailModelsAction } from "@core/state/mail-models/mail-models.action";

@Injectable({providedIn: 'any'})
export class MissionDocumentListFacade  {

  constructor(private store: Store<StoreState>) { }

  getMissionDocuments$(missionId: Maybe<string>): Observable<ImmutableArray<MissionDocument>> {
    return this.store.selectProperty$("missionDocuments").pipe(
      map(documents => _filter(documents, (x: MissionDocument) => x.missionId === missionId))
    )
  }

  getMissionEmployerEmail(missionId: Maybe<string>): string{  
    const cfg: RelationInclude<ModelState, Mission> = {prop: "missions", foreigns: ["employer"]}
    const mission = _getModel<ModelState, Mission>(this.store.state, missionId, cfg);
    const email = mission?.employer?.email;
    return email || "";
  }

  delete = (payload: {ids?: string[], id?: string}): void => 
    this.store.dispatch(<DeleteModelAction<ModelState, MissionDocument>>{type: DeleteModelAction, stateProp: "missionDocuments", payload})

  mailDocuments = (toEmail: string, ids: string[]): void => 
    this.store.dispatch(<MailModelsAction<MissionDocument>>{type: MailModelsAction, stateProp: "missionDocuments", ids, toEmail})
    
}

