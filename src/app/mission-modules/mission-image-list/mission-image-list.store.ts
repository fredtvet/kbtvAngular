import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { DeleteModelStateCommand } from 'src/app/core/model/interfaces';
import { Employer, Mission, MissionImage } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { DeleteModelToStateHttpConverter } from 'src/app/core/services/model/converters/delete-model-to-state-http.converter';
import { CreateMissionImagesStateCommand, CreateMissionImagesToStateHttpConverter } from './create-mission-images-to-state-http.converter';
import { StoreState } from './store-state';
import { GetWithRelationsHelper } from 'src/app/core/model/state-helpers/get-with-relations.helper';
import { map } from 'rxjs/operators';
import { GetWithRelationsConfig } from 'src/app/core/model/state-helpers/get-with-relations.config';
import { StateHttpCommandHandler } from 'src/app/core/services/state/state-http-command.handler';
import { BaseExtendedStore } from 'src/app/core/state/abstracts/base.extended.store';

@Injectable({providedIn: 'any'})
export class MissionImageListStore extends BaseExtendedStore<StoreState>  {

  mission: Mission;

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,        
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
 
  add = (command: CreateMissionImagesStateCommand): void =>
    this.stateHttpCommandHandler.dispatch(this.createStateHttpConverter.convert(command));
  
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