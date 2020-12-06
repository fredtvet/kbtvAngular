import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { MissionNote } from "src/app/core/models";
import { _filter } from 'src/app/shared-app/helpers/array/filter.helper';
import { StateMissionNotes } from 'src/app/state/interfaces';
import { Store } from 'src/app/state/store';

@Injectable({
  providedIn: 'any',
})
export class MissionNoteListFacade  {

  constructor(private store: Store<StateMissionNotes>) { }

  getByMissionId$ = (id: string): Observable<MissionNote[]> => 
    this.store.selectProperty$<MissionNote[]>("missionNotes").pipe(map(arr => 
      _filter<MissionNote>(arr, (x: MissionNote) => x.missionId === id)
  )) 

}
