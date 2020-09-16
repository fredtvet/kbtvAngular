import { Injectable, Inject } from '@angular/core';
import { BaseModelFormStore } from 'src/app/core/model/form';
import { ModelState } from 'src/app/core/model/model.state';
import { GetWithRelationsHelper } from 'src/app/core/model/state-helpers/get-with-relations.helper';
import { Model } from '../../../models/base-entity.interface';
import { ApiService } from '../../api.service';
import { ArrayHelperService } from '../../utility/array-helper.service';
import { DeleteModelToStateHttpConverter } from '../converters/delete-model-to-state-http.converter';
import { SaveModelToStateHttpConverter } from '../converters/save-model-to-state-http.converter';
import { SaveModelStateCommand, DeleteModelStateCommand } from 'src/app/core/model/interfaces';
import { StateHttpCommandHandler } from '../../state/state-http-command.handler';

@Injectable({ providedIn: 'root' })
export class ModelFormStore extends BaseModelFormStore<ModelState, Model> {

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,  
    stateHttpCommandHandler: StateHttpCommandHandler,
    saveStateHttpConverter: SaveModelToStateHttpConverter<ModelState, SaveModelStateCommand<Model>>,
    deleteStateHttpConverter: DeleteModelToStateHttpConverter<ModelState, DeleteModelStateCommand>, 
    getWithRelationsHelper: GetWithRelationsHelper<ModelState>
  ) {
    super(apiService, arrayHelperService, stateHttpCommandHandler, saveStateHttpConverter, getWithRelationsHelper, deleteStateHttpConverter);
  }
    
}