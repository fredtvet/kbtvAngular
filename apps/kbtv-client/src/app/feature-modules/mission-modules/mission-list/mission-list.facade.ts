import { SaveModelFileAction } from "@actions/global-actions";
import { CreateMissionImagesAction, UpdateLastVisitedAction } from "@actions/mission-actions";
import { Injectable } from "@angular/core";
import { ApiUrl } from '@core/api-url.enum';
import { Mission } from "@core/models";
import { _formToSaveModelFileConverter } from '@shared/acton-converters/form-to-save-model-file.converter';
import { MissionCriteriaFormState } from '@shared/constants/forms/mission-criteria-form.const';
import { MissionCriteria } from '@shared/interfaces';
import { Immutable, Maybe, Prop } from 'global-types';
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ComponentStore, Store } from 'state-management';
import { ModelCommand } from 'model/state-commands';
import { _getWithRelations } from 'model/core';
import { ComponentStoreState, StoreState } from './interfaces/store-state';
import { SetMissionCriteriaAction } from './set-mission-criteria.reducer';

@Injectable()
export class MissionListFacade {

  missions$ = 
    this.store.selectProperty$("missions");

  criteria$ = 
    this.componentStore.selectProperty$("missionCriteria");

  get criteria() {
    return this.componentStore.state.missionCriteria;
  }

  criteriaFormState$: Observable<MissionCriteriaFormState> = 
    this.store.select$(["missionTypes", "employers", "missions"]).pipe(
      map(options => { return { options } })
    )
  
  get currentUser() { return this.store.state.currentUser }

  constructor(
    private store: Store<StoreState>,
    private componentStore: ComponentStore<ComponentStoreState>
  ) {}

  getMissionDetails$(id: Maybe<string>): Observable<Maybe<Immutable<Mission>>> {
    if(!id) return of(null);
    this.updateLastVisited(id);

    const children: Prop<StoreState>[] = ["missionNotes", "missionDocuments", "missionImages"];

    return this.store.select$(["missions", "employers", ...children]).pipe(
      map(state => _getWithRelations<Mission, StoreState>(state, {prop: "missions", children, foreigns: ['employers']}, id))
    )
  }

  addCriteria = (missionCriteria: MissionCriteria): void => 
    this.componentStore.dispatch(<SetMissionCriteriaAction>{ type: SetMissionCriteriaAction, missionCriteria });
    
  updateHeaderImage(id: string, file: File): void {
    let action: SaveModelFileAction<Mission> = _formToSaveModelFileConverter({
      formValue: {id, file},
      stateProp: "missions",
      saveAction: ModelCommand.Update
    });

    this.store.dispatch(action);
  }

  addMissionImages = (missionId: string, files: FileList): void =>
   this.store.dispatch(<CreateMissionImagesAction>{type: CreateMissionImagesAction, missionId, files: {...files}});

  private updateLastVisited = (id: string): void => 
    this.store.dispatch(<UpdateLastVisitedAction>{ type: UpdateLastVisitedAction, id })

}
