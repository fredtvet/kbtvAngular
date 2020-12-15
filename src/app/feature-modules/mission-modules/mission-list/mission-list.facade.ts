import { Injectable } from "@angular/core";
import { _sortByDate } from '@array/sort-by-date.helper';
import { ApiUrl } from '@core/api-url.enum';
import { Mission } from "@core/models";
import { SaveModelFileAction } from '@core/state/save-model-file/save-model-file.action';
import { Immutable } from '@immutable/interfaces';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _getWithRelations } from '@model/helpers/get-with-relations.helper';
import { ModelCommand } from '@model/model-command.enum';
import { NotificationService, NotificationType } from '@notification/index';
import { _validateFileExtension } from '@shared-app/helpers/validate-file-extension.helper';
import { _formToSaveModelFileConverter } from '@shared/acton-converters/form-to-save-model-file.converter';
import { MissionCriteriaFormState } from '@shared/constants/forms/mission-criteria-form.const';
import { ImageFileExtensions } from '@shared/constants/image-file-extensions.const';
import { MissionCriteria } from '@shared/interfaces';
import { MissionFilter } from '@shared/mission-filter.model';
import { filterRecords } from '@shared/operators/filter-records.operator';
import { ComponentStore } from '@state/component.store';
import { Store } from '@state/store';
import { combineLatest, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ComponentStoreState, StoreState } from './interfaces/store-state';
import { SetMissionCriteriaAction } from './set-mission-criteria.reducer';
import { UpdateLastVisitedAction } from './update-last-visited.reducer';

@Injectable()
export class MissionListFacade {

  filteredMissions$ = combineLatest([
    this.store.selectProperty$<Mission[]>("missions"),
    this.componentStore.selectProperty$<MissionCriteria>("missionCriteria")
  ]).pipe(
    filterRecords<Mission, MissionCriteria>(MissionFilter, null, true),   
    map(x => _sortByDate(x.records, "updatedAt") )
  );

  criteria$ = 
    this.componentStore.selectProperty$<MissionCriteria>("missionCriteria");

  get criteria() {
    return this.componentStore.selectProperty<MissionCriteria>("missionCriteria");
  }

  criteriaFormState$: Observable<MissionCriteriaFormState> = 
    this.store.select$(["missionTypes", "employers", "missions"]).pipe(
      map(options => { return {options} as unknown})
    )

  constructor(
    private notificationService: NotificationService,
    private store: Store<StoreState>,
    private componentStore: ComponentStore<ComponentStoreState>
  ) {}

  getMissionDetails$(id: string): Observable<Immutable<Mission>> {
    this.updateLastVisited(id);

    let relationCfg = new GetWithRelationsConfig<StoreState>("missions", 
      ["missionNotes", "missionDocuments", "missionImages"]);

    return this.store.select$(relationCfg.includedProps).pipe(
      map(state => _getWithRelations<Mission, StoreState>(state, relationCfg, id))
    )
  }

  addCriteria = (missionCriteria: MissionCriteria): void => 
    this.componentStore.dispatch(<SetMissionCriteriaAction>{ type: SetMissionCriteriaAction, missionCriteria });
    
  updateHeaderImage(id: string, file: File): void {
    if(!_validateFileExtension(file, ImageFileExtensions)) 
      return this.notificationService.notify(
          {title: "Filtypen er ikke tillatt.", type: NotificationType.Error}
      );  

    let action: SaveModelFileAction<Mission> = _formToSaveModelFileConverter({
      formValue: {id, file},
      stateProp: "missions",
      saveAction: ModelCommand.Update
    });

    action.apiUrlOverride = `${ApiUrl.Mission}/${id}/UpdateHeaderImage`;

    this.store.dispatch(action);
  }

  private updateLastVisited = (id: string): void => 
    this.store.dispatch(<UpdateLastVisitedAction>{ type: UpdateLastVisitedAction, id })

}
