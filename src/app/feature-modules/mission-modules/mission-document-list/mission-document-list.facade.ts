import { Injectable } from "@angular/core";
import { Mission, MissionDocument } from "@core/models";
import { ModelState } from '@core/state/model-state.interface';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _getRangeWithRelations } from '@model/helpers/get-range-with-relations.helper';
import { _getWithRelations } from '@model/helpers/get-with-relations.helper';
import { DeleteModelAction } from '@model/state/delete-model/delete-model.action';
import { MailModelsAction } from '@model/state/mail-models/mail-models.action';
import { Store } from '@state/store';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
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
    const mission = _getWithRelations<Mission, ModelState>(state, relationCfg, missionId);
    const email = mission?.employer?.email;
    return email;
  }

  delete = (command: {ids?: string[], id?: string}): void => 
    this.store.dispatch(new DeleteModelAction<ModelState>("missionDocuments", command))

  mailDocuments = (toEmail: string, ids: string[]): void => 
    this.store.dispatch(new MailModelsAction<ModelState>("missionDocuments", ids, toEmail))
    
}

