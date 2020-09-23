import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { DeleteModelStateCommand } from 'src/app/core/model/interfaces';
import { GetWithRelationsConfig } from 'src/app/core/model/state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from 'src/app/core/model/state-helpers/get-with-relations.helper';
import { Mission, MissionImage } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService,
  NotificationService
} from "src/app/core/services";
import { DeleteModelToStateHttpConverter } from 'src/app/core/services/model/converters/delete-model-to-state-http.converter';
import { NotificationType } from 'src/app/core/services/notification';
import { StateHttpCommandHandler } from 'src/app/core/services/state/state-http-command.handler';
import { BaseExtendedStore } from 'src/app/core/state/abstracts/base.extended.store';
import { ImageFileExtensions } from 'src/app/shared/constants/image-file-extensions.const';
import { validateFileExtension } from 'src/app/shared/helpers';
import { CreateMissionImagesStateCommand, CreateMissionImagesToStateHttpConverter } from './create-mission-images-to-state-http.converter';
import { StoreState } from './store-state';

@Injectable({providedIn: 'any'})
export class MissionImageListStore extends BaseExtendedStore<StoreState>  {

  mission: Mission;

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,   
    private notificationService: NotificationService,     
    private stateHttpCommandHandler: StateHttpCommandHandler,
    private deleteStateHttpConverter: DeleteModelToStateHttpConverter<StoreState, DeleteModelStateCommand>,
    private createStateHttpConverter: CreateMissionImagesToStateHttpConverter,
    private getWithRelationsHelper: GetWithRelationsHelper<StoreState>
  ) {
    super(arrayHelperService, apiService);
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
      if(validateFileExtension(command.files[i], ImageFileExtensions)) continue;
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