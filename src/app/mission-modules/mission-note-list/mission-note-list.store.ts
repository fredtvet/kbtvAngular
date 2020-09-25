import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { MissionNote } from "src/app/core/models";
import { ObservableStore } from 'src/app/core/observable-store/observable-store';
import { ObservableStoreBase } from 'src/app/core/observable-store/observable-store-base';
import { ArrayHelperService } from 'src/app/core/services/utility/array-helper.service';
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class MissionNoteListStore extends ObservableStore<StoreState>  {

  constructor(
    base: ObservableStoreBase,
    private arrayHelperService: ArrayHelperService
  ) {
    super(base, {logStateChanges: true});
  }

  getByMissionId$ = (id: string): Observable<MissionNote[]> => 
    this.stateProperty$<MissionNote[]>("missionNotes").pipe(map(arr => 
      this.arrayHelperService.filter<MissionNote>(arr, (x: MissionNote) => x.missionId === id)
  )) 

}
