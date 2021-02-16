import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { Immutable } from 'global-types';
import { FormDataEntry, OptimisticHttpRequest, OptimisticHttpAction } from 'optimistic-http';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { OptimisticRequestOptions } from 'state-model';
import { CreateMissionImagesAction } from './create-mission-images.action';

@Injectable()
export class CreateMissionImagesHttpEffect implements Effect<CreateMissionImagesAction>{

    handle$(actions$: Observable<DispatchedAction<CreateMissionImagesAction>>): Observable<OptimisticHttpAction> {
        return actions$.pipe(
            listenTo([CreateMissionImagesAction]),
            mergeMap(x => {
                const baseRequest = this.createBaseHttpRequest(x.action);
                const baseAction = { 
                    type: OptimisticHttpAction, propagate: true,
                    stateSnapshot: x.stateSnapshot 
                };

                const actions: OptimisticHttpAction[] = [];

                for(let i = 0; i < x.action.fileWrappers.length; i++){
                    const file = x.action.fileWrappers[i].modifiedFile;
                    actions.push({...baseAction,
                        request: <OptimisticHttpRequest>{
                            ...baseRequest, 
                            body: [{name: "file", value: file}]
                        }
                    })
                }

                return of(...actions)
            }),        
        )
    }

    private createBaseHttpRequest(command: Immutable<CreateMissionImagesAction>): Partial<OptimisticHttpRequest<OptimisticRequestOptions>>{
        return {
            apiUrl: `${ApiUrl.MissionImage}?missionId=${command.missionId}`,
            method: "POST",
            options: {description: `Oppretting av bilde på oppdrag ${command.missionId}.`}
        }
    }

}