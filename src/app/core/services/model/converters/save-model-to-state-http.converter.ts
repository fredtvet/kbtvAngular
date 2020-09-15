import { Injectable } from '@angular/core';
import { ModelToStateHttpConverter } from 'src/app/core/model/model-to-state-http.converter';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { ModifyModelWithForeignsHelper } from 'src/app/core/model/state-helpers/modify-model-with-foreigns.helper';
import { Model } from 'src/app/core/models';
import { StateAction } from 'src/app/core/state';
import { StateHttpConverter } from 'src/app/core/state/state-http-converter';
import { ArrayHelperService } from '../../utility/array-helper.service';
import { ModelIdGeneratorService } from '../model-id-generator.service';

@Injectable({providedIn: 'root'})
export class SaveModelToStateHttpConverter<TState, TCommand extends SaveModelStateCommand<Model>> 
   extends ModelToStateHttpConverter<TState, TCommand> implements StateHttpConverter<TState, TCommand>{

   constructor(
      private arrayHelperService: ArrayHelperService,
      private modelIdGenerator: ModelIdGeneratorService,
      private modifyModelWithForeignsHelper: ModifyModelWithForeignsHelper
   ){ super(); }

   protected setupCommand(command: TCommand): TCommand { 
      command = super.setupCommand(command);    
      if(!command.entity) console.error("Mission property and data is required to add mission");
      command.entity = this.modelIdGenerator.generateOnEntity(command.entity, this.modelConfig);
      return command;
   }

   protected createApiUrl(command: TCommand): string {
      const identfifier = this.modelConfig.identifier;
      const endUri = (command.saveAction === StateAction.Update) ? `/${command.entity[identfifier]}` : "";
      return this.modelConfig.apiUrl + endUri;
   }

   protected createHttpMethod(command: TCommand): "POST" | "PUT"{
      return  command.saveAction === StateAction.Update ? "PUT" : "POST";
   }

   protected createHttpBody(command: TCommand): any {console.log('entity', command.entity);
      return command.entity;
   }

   protected modifyState(state: TState, command: TCommand): Partial<TState>{    
      return this.modifyModelWithForeignsHelper.modify(
         state, command.stateProp as any, command.entity,
         (command.saveAction === StateAction.Update)? this.updateFunc : this.createFunc
      )          
   }

   private updateFunc = (entity: Model, entities: Model[]) =>
      this.arrayHelperService.update(entities, entity, this.modelConfig.identifier)

   private createFunc = (entity: Model, entities: Model[]) =>
      this.arrayHelperService.add(entities, entity)
}