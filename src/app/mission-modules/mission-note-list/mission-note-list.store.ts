import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url';
import { MissionNote } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { BaseModelStore } from "../../core/state";
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class MissionNoteListStore extends BaseModelStore<StoreState>  {

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
  }

  getByMissionId$ = (id: number): Observable<MissionNote[]> => 
    this._getBy$("missionNotes", (x: MissionNote) => x.missionId === id)
 
  delete$(id: number): Observable<void> {
    return this.apiService.delete(ApiUrl.MissionNote + '/' + id)
        .pipe(
          tap(x => this._updateMissionNotes(
            StoreActions.DeleteMissionNote, 
            (notes: MissionNote[]) => this.arrayHelperService.removeByIdentifier(notes, id, 'id')))
        );   
  }

  private _updateMissionNotes(action: string, actionFn: (notes: MissionNote[]) => MissionNote[]){
    this._updateStateProperty("missionNotes", action, actionFn);
  }
}

export enum StoreActions {
  DeleteMissionNote = "delete_missionNotes"
}
