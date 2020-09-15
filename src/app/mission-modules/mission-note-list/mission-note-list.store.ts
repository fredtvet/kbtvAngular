import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MissionNote } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { StoreState } from './store-state';
import { BaseStore } from 'src/app/core/state/abstracts/base.store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class MissionNoteListStore extends BaseStore<StoreState>  {

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService);
  }

  getByMissionId$ = (id: string): Observable<MissionNote[]> => 
    this.property$<MissionNote[]>("missionNotes").pipe(map(arr => 
      this.arrayHelperService.filter<MissionNote>(arr, (x: MissionNote) => x.missionId === id)
  )) 

}
