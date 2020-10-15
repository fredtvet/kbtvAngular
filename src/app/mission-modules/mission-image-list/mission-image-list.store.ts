import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Mission, MissionImage } from "src/app/core/models";
import { GetWithRelationsConfig } from 'src/app/core/services/model/state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-with-relations.helper';
import { DeleteModelAction } from 'src/app/core/services/model/state/delete-model/delete-model-state-command.interface';
import { MailModelsAction, MailModelsStateCommand } from 'src/app/core/services/model/state/mail-models/mail-models-state-command.interface';
import { NotificationService, NotificationType } from 'src/app/core/services/notification';
import { ObservableStore } from 'src/app/core/services/state/abstracts/observable-store';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { _validateFileExtension } from 'src/app/shared-app/helpers/validate-file-extension.helper';
import { ImageFileExtensions } from 'src/app/shared/constants/image-file-extensions.const';
import { CreateMissionImagesForm, FormToCreateMissionImagesStateCommandAdapter } from './form-to-create-mission-images-state-command.adapter';
import { StoreState } from './store-state';

@Injectable({providedIn: 'any'})
export class MissionImageListStore extends ObservableStore<StoreState>  {

  mission: Mission;

  constructor(
    base: ObservableStoreBase,
    private notificationService: NotificationService,     
    private commandDispatcher: CommandDispatcher,
    private getWithRelationsHelper: GetWithRelationsHelper
  ) {
    super(base);
  }

  getByMissionId$ = (id: string): Observable<MissionImage[]> => 
    this.stateSlice$(["missions", "employers", "missionImages"]).pipe(map(state => {
      const relationCfg = new GetWithRelationsConfig("missions", ["missionImages"], ["employers"]);
      let mission = this.getWithRelationsHelper.get<Mission>(state, relationCfg, id);
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
    this.commandDispatcher.dispatch(new FormToCreateMissionImagesStateCommandAdapter(state));
  }
  
  delete = (command: {ids?: string[], id?: string}): void => 
    this.commandDispatcher.dispatch({
      ...command, 
      stateProp: "missionImages", 
      action: DeleteModelAction
    });

  mailImages = (toEmail: string, ids: string[]): void => 
    this.commandDispatcher.dispatch<MailModelsStateCommand>({
      toEmail, ids, 
      stateProp: "missionImages",
      action: MailModelsAction 
    })
  
}