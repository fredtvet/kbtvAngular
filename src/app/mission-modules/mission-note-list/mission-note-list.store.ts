import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { MissionNote } from "src/app/core/models";
import { ObservableStore } from 'src/app/core/services/state/abstracts/observable-store';
import { _filter } from 'src/app/shared-app/helpers/array/filter.helper';
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class MissionNoteListStore extends ObservableStore<StoreState>  {

  constructor() { super(); }

  getByMissionId$ = (id: string): Observable<MissionNote[]> => 
    this.stateProperty$<MissionNote[]>("missionNotes").pipe(map(arr => 
      _filter<MissionNote>(arr, (x: MissionNote) => x.missionId === id)
  )) 

}
