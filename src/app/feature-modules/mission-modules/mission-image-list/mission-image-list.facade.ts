import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Mission, MissionImage } from "@core/models";
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _getWithRelations } from '@model/helpers/get-with-relations.helper';
import { DeleteModelActionId } from '@model/state/delete-model/delete-model-action.const';
import { MailModelsStateCommand, MailModelsActionId } from '@model/state/mail-models/mail-models-state-command.interface';
import { NotificationService, NotificationType } from '@notification/index';
import { _validateFileExtension } from '@shared-app/helpers/validate-file-extension.helper';
import { ImageFileExtensions } from '@shared/constants/image-file-extensions.const';
import { Store } from '@state/store';
import { CreateMissionImagesForm, FormToCreateMissionImagesStateCommandAdapter } from './form-to-create-mission-images-state-command.adapter';
import { StoreState } from './store-state';
import { ModelState } from '@core/state/model-state.interface';

@Injectable({providedIn: 'any'})
export class MissionImageListFacade {

  mission: Mission;

  constructor(
    private notificationService: NotificationService,     
    private store: Store<StoreState>
  ) { }

  getByMissionId$ = (id: string): Observable<MissionImage[]> => 
    this.store.select$(["missions", "employers", "missionImages"]).pipe(map(state => {
      const relationCfg = new GetWithRelationsConfig("missions", ["missionImages"], ["employers"]);
      let mission = _getWithRelations<Mission, ModelState>(state, relationCfg, id);
      this.mission = mission;
      return mission?.missionImages;
    }))
 
  add = (state: CreateMissionImagesForm): void =>{
    for(var  i = 0; i < state.files.length; i++){
      if(_validateFileExtension(state.files[i], ImageFileExtensions)) continue;
      return this.notificationService.notify(
        {title: "Filtype ikke tillatt for en eller flere filer", type: NotificationType.Error}
      );  
    }
    this.store.dispatch(new FormToCreateMissionImagesStateCommandAdapter(state));
  }
  
  delete = (command: {ids?: string[], id?: string}): void => 
    this.store.dispatch({
      ...command, 
      stateProp: "missionImages", 
      actionId: DeleteModelActionId
    });

  mailImages = (toEmail: string, ids: string[]): void => 
    this.store.dispatch<MailModelsStateCommand<ModelState>>({
      toEmail, ids, 
      stateProp: "missionImages",
      actionId: MailModelsActionId 
    })
  
}