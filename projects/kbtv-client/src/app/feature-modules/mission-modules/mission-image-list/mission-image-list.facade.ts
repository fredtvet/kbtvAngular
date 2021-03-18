import { Injectable } from "@angular/core";
import { Mission, MissionImage } from "@core/models";
import { ModelState } from '@core/state/model-state.interface';
import { CreateMissionImagesAction } from "@shared-mission/create-mission-images/create-mission-images.action";
import { _filter } from "array-helpers";
import { Immutable, ImmutableArray, Maybe } from 'global-types';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Store } from 'state-management';
import { DeleteModelAction, MailModelsAction, RelationInclude, _getWithRelations } from 'state-model';
import { StoreState } from './store-state';

@Injectable({providedIn: 'any'})
export class MissionImageListFacade {

  constructor(private store: Store<StoreState>) { }

  getMissionImages$(missionId: Maybe<string>): Observable<ImmutableArray<MissionImage>> {
    return this.store.selectProperty$<MissionImage[]>("missionImages").pipe(
      map(images => _filter(images, (x: MissionImage) => x.missionId === missionId))
    )
  }

  getMissionEmployerEmail(missionId: Maybe<string>): string{  
    const cfg: RelationInclude<ModelState> = {prop: "missions", foreigns: ["employers"]}
    const mission = _getWithRelations<Mission, ModelState>(this.store.state, cfg, missionId);
    const email = mission?.employer?.email;
    return email || "";
  }

  add = (missionId: string, files: FileList): void =>
    this.store.dispatch(<CreateMissionImagesAction>{type: CreateMissionImagesAction, missionId, files: {...files}});
   
  delete = (payload: {ids?: string[], id?: string}): void => 
    this.store.dispatch(<DeleteModelAction<ModelState>>{type: DeleteModelAction, stateProp: "missionImages", payload});

  mailImages = (toEmail: string, ids: string[]): void => 
    this.store.dispatch(<MailModelsAction<ModelState>>{type: MailModelsAction, stateProp: "missionImages", ids, toEmail})
  
}