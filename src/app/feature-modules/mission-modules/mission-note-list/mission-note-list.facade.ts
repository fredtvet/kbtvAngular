import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { MissionNote } from "@core/models";
import { _filter } from '@shared-app/helpers/array/filter.helper';
import { StateMissionNotes } from '@state/interfaces';
import { Store } from '@state/store';

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
