import { Injectable } from "@angular/core";
import { Mission } from "@core/models";
import { ModelFileForm, _formToSaveModelFileConverter } from '@shared/constants/form-to-save-model-file.converter';
import { MissionCriteriaFormState } from '@shared-mission/forms/mission-criteria-form.const';
import { MissionCriteria } from '@shared/interfaces';
import { Immutable, Maybe, Prop } from 'global-types';
import { _getModel } from "model/core";
import { ModelCommand } from 'model/state-commands';
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ComponentStore, Store } from 'state-management';
import { ComponentStoreState, StoreState } from './interfaces/store-state';
import { CreateMissionImagesAction } from "@shared-mission/actions.const";
import { SetMissionCriteriaAction, UpdateLastVisitedAction } from "./state/actions.const";

@Injectable()
export class MissionListFacade {

  missions$ = 
    this.store.selectProperty$("missions");

  criteria$ = 
    this.componentStore.selectProperty$("missionCriteria");

  get criteria() {
    return this.componentStore.state.missionCriteria;
  }

  criteriaFormState$: Observable<Immutable<Partial<MissionCriteriaFormState>>> = 
    this.store.select$(["missionTypes", "employers", "missions", "syncConfig"]);
  
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
      map(state => _getModel<StoreState, Mission>(state, id, 
        {prop: "missions", children: ["missionNotes", "missionDocuments", "missionImages"], foreigns: ['employer']}))
    )
  }

  addCriteria = (missionCriteria: Immutable<MissionCriteria>): void => 
    this.componentStore.dispatch(<SetMissionCriteriaAction>{ type: SetMissionCriteriaAction, missionCriteria });
    
  updateHeaderImage(id: string, file: File): void {
    this.store.dispatch(_formToSaveModelFileConverter({
      formValue: <ModelFileForm> {id, file},
      stateProp: "missions",
      saveAction: ModelCommand.Update
    }));
  }

  addMissionImages = (missionId: string, files: FileList): void =>
   this.store.dispatch(<CreateMissionImagesAction>{type: CreateMissionImagesAction, missionId, files: {...files}});

  private updateLastVisited = (id: string): void => 
    this.store.dispatch(<UpdateLastVisitedAction>{ type: UpdateLastVisitedAction, id })

}
