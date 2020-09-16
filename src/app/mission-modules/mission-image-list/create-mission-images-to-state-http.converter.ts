import { StateCommand, BaseStateToHttpConverter } from 'src/app/core/state/state-http-converter';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { IdGeneratorService } from 'src/app/core/services/id-generator.service';
import { ModelFileWrapper } from 'src/app/core/model/model-file.wrapper';
import { Injectable } from '@angular/core';
import { MissionImage } from 'src/app/core/models';
import { StateMissionImages } from 'src/app/core/state';
import { ArrayHelperService } from 'src/app/core/services';

export interface CreateMissionImagesStateCommand extends StateCommand{
    missionId: string;
    files: FileList;
}

interface InternalCommand extends CreateMissionImagesStateCommand { fileWrappers: ModelFileWrapper[] }

@Injectable({providedIn: 'any'})
export class CreateMissionImagesToStateHttpConverter extends BaseStateToHttpConverter<StateMissionImages, CreateMissionImagesStateCommand>{

    constructor(
        private idGenerator: IdGeneratorService,
        private arrayHelperService: ArrayHelperService
        ){ super(); }

    protected cloneInput(command: InternalCommand): InternalCommand{
        const files = command.fileWrappers; //Ignore cloning file
        const cloned = super.cloneInput(command) as InternalCommand;
        cloned.fileWrappers = files;
        return cloned;
    }

    protected setupCommand(command: InternalCommand): InternalCommand {
        if(!command.files || !command.missionId) console.error('no files or missionId provided');
        command = {...command, fileWrappers: []};
        for(let i = 0; i < command.files.length; i++){
            command.fileWrappers.push(new ModelFileWrapper(command.files[i], this.idGenerator.generate()));
        }
        return command;
    }

    protected createCancelMessage(command: InternalCommand): string{
        return `Oppretting av ${command.files.length} bilder på oppdrag ${command.missionId} er reversert.`
    }


    protected createApiUrl(command: InternalCommand): string {
        return `${ApiUrl.MissionImage}?missionId=${command.missionId}`;
    }

    protected createHttpMethod(command: InternalCommand): "POST" {
        return "POST";
    }

    protected createHttpBody(command: InternalCommand): any {
        const httpData: FormData = new FormData();
        for(let i = 0; i < command.fileWrappers.length; i++){
            const file = command.fileWrappers[i].modifiedFile;
            httpData.append('file', file, file.name);
        }
        return httpData;
    }

    protected modifyState(state: StateMissionImages, command: InternalCommand): Partial<StateMissionImages>{   
        const entities: MissionImage[] = [];
        for(let i = 0; i < command.fileWrappers.length; i++){
            const wrapper = command.fileWrappers[i];
            entities.push({id: wrapper.id, missionId: command.missionId, fileName: wrapper.modifiedFile.name})
        }
        return {missionImages: this.arrayHelperService.addOrUpdateRange(state.missionImages, entities, "id")};
    }
}    

