import { Injectable } from '@angular/core';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { Model } from '../../../models/base-entity.interface';
import { ApiService } from '../../api.service';
import { StateHttpCommandHandler } from "../../state/state-http-command.handler";
import { DeleteModelToStateHttpConverter } from '../converters/delete-model-to-state-http.converter';
import { SaveModelToStateHttpConverter } from '../converters/save-model-to-state-http.converter';
import { DeleteModelStateCommand } from '../interfaces/delete-model-state-command.interface';
import { ModelState } from '../interfaces/model-state.interface';
import { SaveModelStateCommand } from '../interfaces/save-model-state-command.interface';
import { GetWithRelationsHelper } from '../state-helpers/get-with-relations.helper';
import { BaseModelFormStore } from './abstracts/base-model-form.store';

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