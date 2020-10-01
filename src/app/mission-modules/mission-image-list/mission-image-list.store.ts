import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Mission, MissionImage } from "src/app/core/models";
import { ObservableStore } from 'src/app/core/services/state/abstracts/observable-store';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { DeleteModelToStateHttpConverter } from 'src/app/core/services/model/converters/delete-model-to-state-http.converter';
import { NotificationService, NotificationType } from 'src/app/core/services/notification';
import { StateHttpCommandHandler } from "src/app/core/services/state/state-http-command.handler";
import { ImageFileExtensions } from 'src/app/shared/constants/image-file-extensions.const';
import { _validateFileExtension } from 'src/app/shared-app/helpers/validate-file-extension.helper';
import { CreateMissionImagesStateCommand, CreateMissionImagesToStateHttpConverter } from './create-mission-images-to-state-http.converter';
import { StoreState } from './store-state';
import { DeleteModelStateCommand } from 'src/app/core/services/model/interfaces';
import { GetWithRelationsConfig } from 'src/app/core/services/model/state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-with-relations.helper';

@Injectable({providedIn: 'any'})
export class MissionImageListStore extends ObservableStore<StoreState>  {

  mission: Mission;

  constructor(
    base: ObservableStoreBase,
    private notificationService: NotificationService,     
    private stateHttpCommandHandler: StateHttpCommandHandler,
    private deleteStateHttpConverter: DeleteModelToStateHttpConverter<StoreState, DeleteModelStateCommand>,
    private createStateHttpConverter: CreateMissionImagesToStateHttpConverter,
    private getWithRelationsHelper: GetWithRelationsHelper
  ) {
    super(base);
  }

  getByMissionId$ = (id: string): Observable<MissionImage[]> => 
    this.stateSlice$(["missions", "employers", "missionImages"]).pipe(map(state => {
      const relationCfg = new GetWithRelationsConfig("missions", {include: {missionImages: true}}, {include: {employers: true}});
      let mission = this.getWithRelationsHelper.get<Mission>(state, relationCfg, id);
      this.mission = mission;
      return mission?.missionImages;
    }))
 
  add = (command: CreateMissionImagesStateCommand): void =>{
    for(var  i = 0; i < command.files.length; i++){
      if(_validateFileExtension(command.files[i], ImageFileExtensions)) continue;
      return this.notificationService.notify(
        {title: "Filtype ikke tillatt for en eller flere filer", type: NotificationType.Error}
      );  
    }
    this.stateHttpCommandHandler.dispatch(this.createStateHttpConverter.convert(command));
  }
  
  delete = (command: DeleteModelStateCommand): void => 
    this.stateHttpCommandHandler.dispatch(this.deleteStateHttpConverter.convert({...command, stateProp: "missionImages"}));

  mailImages(toEmail: string, ids: string[]){
    this.stateHttpCommandHandler.dispatch({
      httpBody:{toEmail, ids},
       httpMethod: "POST", 
       apiUrl:`${ApiUrl.MissionImage}/SendImages`
    })
  }
 
  
}