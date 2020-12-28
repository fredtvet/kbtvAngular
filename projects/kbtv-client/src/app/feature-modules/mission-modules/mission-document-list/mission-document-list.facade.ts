import { Injectable } from "@angular/core";
import { Mission, MissionDocument } from "@core/models";
import { ModelState } from '@core/state/model-state.interface';
import { ImmutableArray, Maybe } from 'global-types';
import { _getRangeWithRelations } from '@model/helpers/get-range-with-relations.helper';
import { _getWithRelations } from '@model/helpers/get-with-relations.helper';
import { RelationInclude } from "@model/interfaces";
import { DeleteModelAction } from '@model/state/delete-model/delete-model.action';
import { MailModelsAction } from '@model/state/mail-models/mail-models.action';
import { Store } from '@state/store';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { StoreState } from './store-state';

@Injectable({providedIn: 'any'})
export class MissionDocumentListFacade  {

  constructor(private store: Store<StoreState>) { }

  getMissionDocuments$(missionId: Maybe<string>): Observable<ImmutableArray<MissionDocument>> {
    return this.store.select$(["missionDocuments", "employers", "documentTypes"]).pipe(map(state => {
      const cfg: RelationInclude<StoreState> = {prop: "missionDocuments", foreigns: ["documentTypes"]}
      return _getRangeWithRelations(state || {}, cfg, (x: MissionDocument) => x.missionId === missionId);
    }))
  }

  getMissionEmployerEmail(missionId: Maybe<string>): string{  
    const cfg: RelationInclude<ModelState> = {prop: "missions", foreigns: ["employers"]}
    const mission = _getWithRelations<Mission, ModelState>(this.store.state, cfg, missionId);
    const email = mission?.employer?.email;
    return email || "";
  }

  delete = (payload: {ids?: string[], id?: string}): void => 
    this.store.dispatch(<DeleteModelAction<ModelState>>{type: DeleteModelAction, stateProp: "missionDocuments", payload})

  mailDocuments = (toEmail: string, ids: string[]): void => 
    this.store.dispatch(<MailModelsAction<ModelState>>{type: MailModelsAction, stateProp: "missionDocuments", ids, toEmail})
    
}

