import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from '@core/api-url.enum';
import { FormDataEntry, HttpRequest } from '@http/interfaces';
import { Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { HttpAction } from '@http/state/http.effect';
import { CreateMissionImagesAction } from './create-mission-images.action';
import { Immutable } from 'global-types';

@Injectable()
export class CreateMissionImagesHttpEffect implements Effect<CreateMissionImagesAction>{

    handle$(actions$: Observable<DispatchedAction<CreateMissionImagesAction>>): Observable<HttpAction> {
        return actions$.pipe(
            listenTo([CreateMissionImagesAction]),
            map(x => <HttpAction>{ 
                type: HttpAction, propagate: true,
                request: this.createHttpRequest(x.action), 
                stateSnapshot: x.stateSnapshot 
            }),        
        )
    }

    private createHttpRequest(command: Immutable<CreateMissionImagesAction>): HttpRequest{
        return {
            apiUrl: `${ApiUrl.MissionImage}?missionId=${command.missionId}`,
            body: this.createHttpBody(command),
            method: "POST",
            cancelMessage: `Oppretting av ${command.fileWrappers.length} bilder på oppdrag ${command.missionId} er reversert.`
        }
    }

    private createHttpBody(command: Immutable<CreateMissionImagesAction>): FormDataEntry[] {
        const entries: FormDataEntry[] = [];
        for(let i = 0; i < command.fileWrappers.length; i++){
            const file = command.fileWrappers[i].modifiedFile;
            entries.push({name: "file", value: file})
        }
        return entries;
    }

}