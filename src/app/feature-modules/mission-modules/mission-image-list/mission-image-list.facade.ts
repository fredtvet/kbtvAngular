import { Injectable } from "@angular/core";
import { Mission, MissionImage } from "@core/models";
import { ModelState } from '@core/state/model-state.interface';
import { Immutable, ImmutableArray } from '@immutable/interfaces';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _getWithRelations } from '@model/helpers/get-with-relations.helper';
import { DeleteModelAction } from '@model/state/delete-model/delete-model.action';
import { MailModelsAction } from '@model/state/mail-models/mail-models.action';
import { NotificationService, NotificationType } from '@notification/index';
import { _validateFileExtension } from '@shared-app/helpers/validate-file-extension.helper';
import { ImageFileExtensions } from '@shared/constants/image-file-extensions.const';
import { Store } from '@state/store';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { CreateMissionImagesForm, _formToCreateMissionImagesConverter } from './form-to-create-mission-images.converter';
import { StoreState } from './store-state';

@Injectable({providedIn: 'any'})
export class MissionImageListFacade {

  mission: Immutable<Mission>;

  constructor(
    private notificationService: NotificationService,     
    private store: Store<StoreState>
  ) { }

  getByMissionId$ = (id: string): Observable<ImmutableArray<MissionImage>> => 
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
    this.store.dispatch(_formToCreateMissionImagesConverter(state));
  }
  
  delete = (command: {ids?: string[], id?: string}): void => 
    this.store.dispatch(new DeleteModelAction<ModelState>("missionImages", command));

  mailImages = (toEmail: string, ids: string[]): void => 
    this.store.dispatch(new MailModelsAction<ModelState>("missionImages", ids, toEmail))
  
}