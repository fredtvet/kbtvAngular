import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { MissionNote } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { StoreState } from './store-state';
import { BaseModelStore, OnStateUpdate, OnStateAdd, OnStateDelete } from 'src/app/core/state';

@Injectable({
  providedIn: 'any',
})
export class MissionNoteFormStore extends BaseModelStore<StoreState> implements OnStateAdd, OnStateUpdate, OnStateDelete {

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
    console.log("MissionNoteFormStore");
  }

  getNoteById$ = (id: number): Observable<MissionNote> => super._getById$("missionNotes", id, "id")
 
  add$(note: MissionNote): Observable<void> {
    return this.apiService.post(ApiUrl.MissionNote, note)
        .pipe(
          tap(x => this._updateStateProperty("missionNotes", 
            (notes: MissionNote[]) => this.arrayHelperService.add(notes, x)))
        );  
  }

  update$(note: MissionNote): Observable<void> {
    return this.apiService.put(ApiUrl.MissionNote + '/' + note.id, note)
        .pipe(
          tap(x => this._updateStateProperty("missionNotes",
            (notes: MissionNote[]) => this.arrayHelperService.update(notes, x, 'id')))
        );   
  }
   
  delete$(id: number): Observable<void> {
    return this.apiService.delete(ApiUrl.MissionNote + '/' + id)
        .pipe(
          tap(x => this._updateStateProperty("missionNotes",
            (notes: MissionNote[]) => this.arrayHelperService.removeByIdentifier(notes, id, 'id')))
        );   
  }
}