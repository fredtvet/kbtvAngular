import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from '@core/api-url.enum';
import { HttpRequest } from '@http/interfaces';
import { Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { HttpAction } from '@http/state/http.effect';
import { CreateMissionImagesAction } from './create-mission-images.action';

@Injectable()
export class CreateMissionImagesHttpEffect implements Effect<CreateMissionImagesAction>{

    handle$(actions$: Observable<DispatchedAction<CreateMissionImagesAction>>): Observable<HttpAction> {
        return actions$.pipe(
            listenTo([CreateMissionImagesAction]),
            map(x => new HttpAction(this.createHttpRequest(x.action), x.stateSnapshot)),        
        )
    }

    private createHttpRequest(command: CreateMissionImagesAction): HttpRequest{
        return {
            apiUrl: `${ApiUrl.MissionImage}?missionId=${command.missionId}`,
            body: this.createHttpBody(command),
            method: "POST",
            cancelMessage: `Oppretting av ${command.fileWrappers.length} bilder på oppdrag ${command.missionId} er reversert.`
        }
    }

    private createHttpBody(command: CreateMissionImagesAction): any {
        const httpData: FormData = new FormData();
        for(let i = 0; i < command.fileWrappers.length; i++){
            const file = command.fileWrappers[i].modifiedFile;
            httpData.append('file', file, file.name);
        }
        return httpData;
    }

}