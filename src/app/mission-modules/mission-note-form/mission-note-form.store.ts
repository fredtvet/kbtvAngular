import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url';
import { MissionNote } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { StoreState } from './store-state';
import { BaseModelStore } from 'src/app/core/state';

@Injectable({
  providedIn: 'any',
})
export class MissionNoteFormStore extends BaseModelStore<StoreState>  {

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
  }

  getNoteById$ = (id: number): Observable<MissionNote> => super._getById$("missionNotes", id, "id")
 
  add$(note: MissionNote): Observable<void> {
    return this.apiService.post(ApiUrl.MissionNote, note)
        .pipe(
          tap(x => this._updateMissionNotes(
            StoreActions.AddMissionNote, 
            (notes: MissionNote[]) => this.arrayHelperService.add(notes, x)))
        );  
  }

  update$(note: MissionNote): Observable<void> {
    return this.apiService.put(ApiUrl.MissionNote + '/' + note.id, note)
        .pipe(
          tap(x => this._updateMissionNotes(
            StoreActions.UpdateMissionNote, 
            (notes: MissionNote[]) => this.arrayHelperService.update(notes, x, 'id')))
        );   
  }

  private _updateMissionNotes(action: string, actionFn: (notes: MissionNote[]) => MissionNote[]){
    this._updateStateProperty("missionNotes", action, actionFn);
  }
}

export enum StoreActions {
  AddMissionNote = "add_missionNotes",
  UpdateMissionNote = "update_missionNotes"
}
