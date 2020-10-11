import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { HttpCommandHandler } from 'src/app/core/services/http/http-command.handler';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { CreateMissionImagesAction, CreateMissionImagesStateCommand } from './create-mission-images-state-command.interface';

@Injectable({providedIn: 'root'})
export class CreateMissionImagesHttpEffect {

    constructor(
        commandDispatcher: CommandDispatcher,
        private httpCommandHandler: HttpCommandHandler,
    ){  
        commandDispatcher
            .listen$<CreateMissionImagesStateCommand>(CreateMissionImagesAction)
            .subscribe(res => this.handle(res.command, res.state))
    }

    private handle(command: CreateMissionImagesStateCommand, stateSnapshot: any): void{
        if(!command.fileWrappers || !command.missionId) 
            console.error('no files or missionId provided');

        this.httpCommandHandler.handle({
            apiUrl: `${ApiUrl.MissionImage}?missionId=${command.missionId}`,
            httpBody: this.createHttpBody(command),
            httpMethod: "POST",
            cancelMessage: `Oppretting av ${command.fileWrappers.length} bilder på oppdrag ${command.missionId} er reversert.`
        }, stateSnapshot)
    }

    private createHttpBody(command: CreateMissionImagesStateCommand): any {
        const httpData: FormData = new FormData();
        for(let i = 0; i < command.fileWrappers.length; i++){
            const file = command.fileWrappers[i].modifiedFile;
            httpData.append('file', file, file.name);
        }
        return httpData;
    }

}