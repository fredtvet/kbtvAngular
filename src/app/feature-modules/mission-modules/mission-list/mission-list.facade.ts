import { Injectable } from "@angular/core";
import { ApiUrl } from '@core/api-url.enum';
import { Mission } from "@core/models";
import { ModelState } from '@core/state/model-state.interface';
import { SaveModelFileStateCommand } from '@core/state/save-model-file/save-model-file-action.const';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _getWithRelations } from '@model/helpers/get-with-relations.helper';
import { ModelCommand } from '@model/model-command.enum';
import { NotificationService, NotificationType } from '@notification/index';
import { _sortByDate } from '@array/sort-by-date.helper';
import { _validateFileExtension } from '@shared-app/helpers/validate-file-extension.helper';
import { MissionCriteriaFormState } from '@shared/constants/forms/mission-criteria-form.const';
import { ImageFileExtensions } from '@shared/constants/image-file-extensions.const';
import { FormToSaveModelFileStateCommandAdapter } from '@shared/form-adapters/form-to-save-model-file-state-command.adapter';
import { MissionCriteria } from '@shared/interfaces';
import { MissionFilter } from '@shared/mission-filter.model';
import { filterRecords } from '@shared/operators/filter-records.operator';
import { ComponentStore } from '@state/component.store';
import { Store } from '@state/store';
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ComponentStoreState, StoreState } from './interfaces/store-state';
import { SetMissionCriteriaActionId } from './set-mission-criteria.reducer';
import { UpdateLastVisitedActionId, UpdateLastVisitedCommand } from './update-last-visited.reducer';

@Injectable()
export class MissionListFacade {

  filteredMissions$: Observable<Mission[]> = combineLatest([
    this.store.selectProperty$<Mission[]>("missions"),
    this.componentStore.selectProperty$<MissionCriteria>("missionCriteria")
  ]).pipe(
    filterRecords<Mission, MissionCriteria>(MissionFilter, null, true),   
    map(x => _sortByDate(x.records, "updatedAt") ),
  );

  criteria$: Observable<MissionCriteria> = 
    this.componentStore.selectProperty$<MissionCriteria>("missionCriteria");

  get criteria(): MissionCriteria {
    return this.componentStore.selectProperty<MissionCriteria>("missionCriteria");
  }

  criteriaFormState$: Observable<MissionCriteriaFormState> = 
    this.store.select$(["missionTypes", "employers", "missions"], false).pipe(
      map(options => { return {options} as any})
    )

  constructor(
    private notificationService: NotificationService,
    private store: Store<StoreState>,
    private componentStore: ComponentStore<ComponentStoreState>
  ) {}

  getMissionDetails$(id: string): Observable<Mission> {
    this.updateLastVisited(id);

    let relationCfg = new GetWithRelationsConfig("missions", 
      ["missionNotes", "missionDocuments", "missionImages"]);

    return this.store.select$(relationCfg.includedProps as any).pipe(
      map(state => _getWithRelations(state, relationCfg, id))
    )
  }

  addCriteria = (missionCriteria: MissionCriteria): void => 
    this.componentStore.dispatch({actionId: SetMissionCriteriaActionId, missionCriteria});
    
  updateHeaderImage(id: string, file: File): void {
    if(!_validateFileExtension(file, ImageFileExtensions)) 
      return this.notificationService.notify(
          {title: "Filtypen er ikke tillatt.", type: NotificationType.Error}
      );  

    let command: SaveModelFileStateCommand<Mission, ModelState> = new FormToSaveModelFileStateCommandAdapter({
      formValue: {id, file},
      stateProp: "missions",
      saveAction: ModelCommand.Update
    });

    command.apiUrlOverride = `${ApiUrl.Mission}/${id}/UpdateHeaderImage`;

    this.store.dispatch(command);
  }

  private updateLastVisited = (id: string): void => 
    this.store.dispatch(<UpdateLastVisitedCommand>{
      actionId: UpdateLastVisitedActionId, id
    })

}
