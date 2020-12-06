import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Mission } from "src/app/core/models";
import { GetWithRelationsConfig } from 'src/app/model/helpers/get-with-relations.config';
import { _getWithRelations } from 'src/app/model/helpers/get-with-relations.helper';
import { SaveModelFileStateCommand } from 'src/app/model/state/save-model-file/save-model-file-action.const';
import { NotificationService, NotificationType } from 'src/app/notification';
import { ActionType } from 'src/app/shared-app/enums';
import { _sortByDate } from 'src/app/shared-app/helpers/array/sort-by-date.helper';
import { _validateFileExtension } from 'src/app/shared-app/helpers/validate-file-extension.helper';
import { MissionCriteriaFormState } from 'src/app/shared/constants/forms/mission-criteria-form.const';
import { ImageFileExtensions } from 'src/app/shared/constants/image-file-extensions.const';
import { MissionCriteria } from 'src/app/shared/interfaces';
import { MissionFilter } from 'src/app/shared/mission-filter.model';
import { FormToSaveModelFileStateCommandAdapter } from 'src/app/shared/model-form/adapters/form-to-save-model-file-state-command.adapter';
import { filterRecords } from 'src/app/shared/operators/filter-records.operator';
import { ComponentStore } from 'src/app/state/component.store';
import { Store } from 'src/app/state/store';
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

    let command: SaveModelFileStateCommand<Mission> = new FormToSaveModelFileStateCommandAdapter({
      formState: {id, file},
      stateProp: "missions",
      saveAction: ActionType.Update
    });

    command.apiUrlOverride = `${ApiUrl.Mission}/${id}/UpdateHeaderImage`;

    this.store.dispatch(command);
  }

  private updateLastVisited = (id: string): void => 
    this.store.dispatch(<UpdateLastVisitedCommand>{
      actionId: UpdateLastVisitedActionId, id
    })

}
