import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { HttpRequest } from 'src/app/core/services/http/interfaces';
import { HttpActionId, HttpCommand } from 'src/app/core/services/http/state/http.effect';
import { DispatchedAction } from 'src/app/state/action-dispatcher';
import { StateAction } from 'src/app/state/interfaces';
import { Effect } from 'src/app/state/interfaces/effect.interface';
import { listenTo } from 'src/app/state/operators/listen-to.operator';
import { CreateMissionImagesActionId, CreateMissionImagesStateCommand } from './create-mission-images-state-command.interface';

@Injectable()
export class CreateMissionImagesHttpEffect implements Effect<CreateMissionImagesStateCommand>{

    constructor(){ }

    handle$(actions$: Observable<DispatchedAction<CreateMissionImagesStateCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([CreateMissionImagesActionId]),
            map(x => { return <HttpCommand>{
                actionId: HttpActionId, propagate: true,
                request: this.createHttpRequest(x.action),
                stateSnapshot: x.stateSnapshot,
            }}),        
        )
    }

    private createHttpRequest(command: CreateMissionImagesStateCommand): HttpRequest{
        return {
            apiUrl: `${ApiUrl.MissionImage}?missionId=${command.missionId}`,
            body: this.createHttpBody(command),
            method: "POST",
            cancelMessage: `Oppretting av ${command.fileWrappers.length} bilder på oppdrag ${command.missionId} er reversert.`
        }
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