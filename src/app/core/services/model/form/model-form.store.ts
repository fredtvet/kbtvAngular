import { Injectable } from '@angular/core';
import { BaseModelFormStore } from 'src/app/core/model/form';
import { DeleteModelStateCommand, SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { ModelState } from 'src/app/core/model/model.state';
import { GetWithRelationsHelper } from 'src/app/core/model/state-helpers/get-with-relations.helper';
import { ObservableStoreBase } from 'src/app/core/observable-store/observable-store-base';
import { Model } from '../../../models/base-entity.interface';
import { ApiService } from '../../api.service';
import { StateHttpCommandHandler } from '../../state/state-http-command.handler';
import { DeleteModelToStateHttpConverter } from '../converters/delete-model-to-state-http.converter';
import { SaveModelToStateHttpConverter } from '../converters/save-model-to-state-http.converter';

@Injectable({ providedIn: 'root' })
export class ModelFormStore extends BaseModelFormStore<ModelState, Model> {

  constructor(
    base: ObservableStoreBase,
    apiService: ApiService,
    stateHttpCommandHandler: StateHttpCommandHandler,
    saveStateHttpConverter: SaveModelToStateHttpConverter<ModelState, SaveModelStateCommand<Model>>,
    deleteStateHttpConverter: DeleteModelToStateHttpConverter<ModelState, DeleteModelStateCommand>, 
    getWithRelationsHelper: GetWithRelationsHelper
  ) {
    super(apiService, base, stateHttpCommandHandler, saveStateHttpConverter, getWithRelationsHelper, deleteStateHttpConverter);
  }
    
}