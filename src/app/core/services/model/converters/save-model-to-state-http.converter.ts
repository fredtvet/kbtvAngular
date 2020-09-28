import { Injectable } from '@angular/core';
import { ModelToStateHttpConverter } from 'src/app/core/model/model-to-state-http.converter';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { ModifyModelWithForeignsHelper } from 'src/app/core/model/state-helpers/modify-model-with-foreigns.helper';
import { Model } from 'src/app/core/models';
import { StateAction } from 'src/app/core/state';
import { StateHttpConverter } from 'src/app/core/state/state-http-converter';
import { ModelIdGeneratorService } from '../model-id-generator.service';
import { translations } from 'src/app/shared/translations';
import { Prop } from 'src/app/core/model/state.types';
import { ModelStateConfig } from 'src/app/core/model/model-state.config';
import { _add } from 'src/app/shared-app/helpers/array/add.helper';
import { _update } from 'src/app/shared-app/helpers/array/update.helper';

@Injectable({providedIn: 'root'})
export class SaveModelToStateHttpConverter<TState, TCommand extends SaveModelStateCommand<Model>> 
   extends ModelToStateHttpConverter<TState, TCommand> implements StateHttpConverter<TState, TCommand>{

   constructor(
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

   protected createCancelMessage(command: TCommand): string{
      const saveWord = command.saveAction === StateAction.Update ? "Oppdatering" : "Oppretting";
      const entityWord = translations[this.modelConfig.foreignProp].toLowerCase();
      const displayPropWord = translations[this.modelConfig.displayProp || this.modelConfig.identifier].toLowerCase();
      const displayPropValue = command.entity[this.modelConfig.displayProp];
      return `${saveWord} av ${entityWord} med ${displayPropWord} ${displayPropValue} er reversert!`;
   }

   protected createHttpMethod(command: TCommand): "POST" | "PUT"{
      return  command.saveAction === StateAction.Update ? "PUT" : "POST";
   }

   protected createHttpBody(command: TCommand): any {
      return command.entity;
   }

   //Add state prop in addition to fk props where entity has foreign value set
   protected createProperties(command: TCommand): Prop<TState>[]{
      const props: string[] = [command.stateProp];

      if(this.modelConfig.foreigns)
         for(const fkProp of this.modelConfig.foreigns){
            const fkCfg = ModelStateConfig.get(fkProp as any);
            if(command.entity[fkCfg.displayProp]) props.push(fkProp);
         }

      return props as Prop<TState>[];
   }

   protected modifyState(state: TState, command: TCommand): Partial<TState>{    
      return this.modifyModelWithForeignsHelper.modify(
         state, command.stateProp as any, command.entity,
         (command.saveAction === StateAction.Update)? this.updateFunc : this.createFunc
      )          
   }

   private updateFunc = (entity: Model, entities: Model[]) =>
      _update(entities, entity, this.modelConfig.identifier)

   private createFunc = (entity: Model, entities: Model[]) =>
      _add(entities, entity)
}