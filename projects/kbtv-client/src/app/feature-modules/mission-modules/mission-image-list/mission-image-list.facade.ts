import { Injectable } from "@angular/core";
import { Mission, MissionImage } from "@core/models";
import { ModelState } from '@core/state/model-state.interface';
import { _validateFileExtension } from '@shared-app/helpers/validate-file-extension.helper';
import { ValidationRules } from "@shared/constants/validation-rules.const";
import { Immutable, ImmutableArray, Maybe } from 'global-types';
import { NotificationService, NotificationType } from 'notification';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Store } from 'state-management';
import { DeleteModelAction, MailModelsAction, RelationInclude, _getWithRelations } from 'state-model';
import { CreateMissionImagesForm, _formToCreateMissionImagesConverter } from './form-to-create-mission-images.converter';
import { StoreState } from './store-state';

@Injectable({providedIn: 'any'})
export class MissionImageListFacade {

  mission: Maybe<Immutable<Mission>>;

  constructor(
    private notificationService: NotificationService,     
    private store: Store<StoreState>
  ) { }

  getByMissionId$ = (id: Maybe<string>): Observable<Maybe<ImmutableArray<MissionImage>>> => 
    this.store.select$(["missions", "employers", "missionImages"]).pipe(map(state => {
      const cfg: RelationInclude<ModelState> = {prop: "missions", children: ["missionImages"], foreigns: ["employers"]}
      let mission = _getWithRelations<Mission, ModelState>(state, cfg, id);
      this.mission = mission;
      return mission?.missionImages;
    }))
 
  add = (state: CreateMissionImagesForm): void =>{
    for(var  i = 0; i < state.files.length; i++){
      if(_validateFileExtension(state.files[i], ValidationRules.MissionImageFileExtensions)) continue;
      return this.notificationService.notify(
        {title: "Filtype ikke tillatt for en eller flere filer", type: NotificationType.Error}
      );  
    }
    this.store.dispatch(_formToCreateMissionImagesConverter(state));
  }
  
  delete = (payload: {ids?: string[], id?: string}): void => 
    this.store.dispatch(<DeleteModelAction<ModelState>>{type: DeleteModelAction, stateProp: "missionImages", payload});

  mailImages = (toEmail: string, ids: string[]): void => 
    this.store.dispatch(<MailModelsAction<ModelState>>{type: MailModelsAction, stateProp: "missionImages", ids, toEmail})
  
}