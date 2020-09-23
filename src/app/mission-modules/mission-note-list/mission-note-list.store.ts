import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MissionNote } from "src/app/core/models";
import { StoreState } from './store-state';
import { map } from 'rxjs/operators';
import { BaseExtendedStore } from 'src/app/core/state/abstracts/base.extended.store';
import { ApiService } from 'src/app/core/services/api.service';
import { ArrayHelperService } from 'src/app/core/services/utility/array-helper.service';

@Injectable({
  providedIn: 'any',
})
export class MissionNoteListStore extends BaseExtendedStore<StoreState>  {

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
