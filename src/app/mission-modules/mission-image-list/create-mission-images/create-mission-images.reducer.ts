import { Injectable } from '@angular/core';
import { MissionImage } from 'src/app/core/models';
import { ObservableStore } from 'src/app/core/services/state/abstracts/observable-store';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { StateMissionImages } from 'src/app/core/services/state/interfaces';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { _addOrUpdateRange } from 'src/app/shared-app/helpers/array/add-or-update-range.helper';
import { _add } from 'src/app/shared-app/helpers/array/add.helper';
import { _update } from 'src/app/shared-app/helpers/array/update.helper';
import { CreateMissionImagesAction, CreateMissionImagesStateCommand } from './create-mission-images-state-command.interface';

@Injectable({providedIn: 'root'})
export class CreateMissionImagesReducer extends ObservableStore<StateMissionImages>{

    constructor(
        base: ObservableStoreBase,
        commandDispatcher: CommandDispatcher,
    ){ 
        super(base);
        
        commandDispatcher
            .listen$<CreateMissionImagesStateCommand>(CreateMissionImagesAction)
            .subscribe(res => this.handle(res.command))
    }

    private handle(command: CreateMissionImagesStateCommand): void{
        if(!command.fileWrappers || !command.missionId) 
            console.error('no files or missionId provided');

        this.setStateWithStateFunc(["missionImages"], (state: any)  => this.modifyState(state, command));
    }

    private modifyState(state: any, command: CreateMissionImagesStateCommand): StateMissionImages{  
        const entities: MissionImage[] = [];
        for(let i = 0; i < command.fileWrappers.length; i++){
            const wrapper = command.fileWrappers[i];
            const file = wrapper.modifiedFile;
            entities.push({
                id: wrapper.id, 
                missionId: command.missionId, 
                fileName: wrapper.modifiedFile.name,
                temp_localFileUrl: URL.createObjectURL(file)
            })
        }
        return {missionImages: _addOrUpdateRange(state.missionImages, entities, "id")};
    }
    
}