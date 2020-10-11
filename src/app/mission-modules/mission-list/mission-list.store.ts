import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Mission, User } from "src/app/core/models";
import { ApiService } from 'src/app/core/services/api.service';
import { FilteredResponse, FilterStore } from 'src/app/core/services/filter/interfaces';
import { FormToSaveModelFileStateCommandAdapter } from 'src/app/core/services/model/adapters/form-to-save-model-file-state-command.adapter';
import { GetWithRelationsConfig } from 'src/app/core/services/model/state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-with-relations.helper';
import { SaveModelFileStateCommand } from 'src/app/core/services/model/state/save-model-file/save-model-file-state-command.interface';
import { NotificationService } from 'src/app/core/services/notification';
import { NotificationType } from 'src/app/core/services/notification/notification-type.enum';
import { BaseModelStore } from 'src/app/core/services/state/abstracts/base-model.store';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { StateAction } from 'src/app/core/services/state/state-action.enum';
import { _filter } from 'src/app/shared-app/helpers/array/filter.helper';
import { _sortByDate } from 'src/app/shared-app/helpers/array/sort-by-date.helper';
import { _validateFileExtension } from 'src/app/shared-app/helpers/validate-file-extension.helper';
import { ImageFileExtensions } from 'src/app/shared/constants/image-file-extensions.const';
import { MissionCriteria } from 'src/app/shared/interfaces';
import { MissionFilter } from 'src/app/shared/mission-filter.model';
import { StoreState } from './interfaces/store-state';
import { MissionFilterViewConfig } from './mission-filter-view/mission-filter-view-config.interface';

@Injectable({
  providedIn: 'any',
})
export class MissionListStore extends BaseModelStore<StoreState> implements FilterStore<MissionCriteria, MissionFilterViewConfig> {

  filterConfig$: Observable<MissionFilterViewConfig> = 
    this.stateSlice$(["missionCriteria","missionTypes", "employers", "missions"]).pipe(map(state => {
      return {
        criteria: state.missionCriteria,
        state: {
          missionTypes: state.missionTypes, 
          employers: state.employers,
          missions: state.missions
        }
      }
    }));

  filteredMissions$: Observable<FilteredResponse<MissionCriteria, Mission>> = 
    this.stateSlice$(["missions", "missionCriteria"]).pipe(
        map(state => {
        const filter = new MissionFilter(state.missionCriteria, null, true);
        const filtered = _filter(state.missions, (entity) => filter.check(entity));
        return {
            criteria: state.missionCriteria,
            records: _sortByDate(filtered, "updatedAt") 
        }})
      );

  criteria$: Observable<MissionCriteria> = this.stateProperty$("missionCriteria");
      
  currentUser: User = this.getStateProperty<User>("currentUser");

  get criteria(): MissionCriteria {
    return this.getStateProperty("missionCriteria");
  }

  constructor(
    apiService: ApiService,
    base: ObservableStoreBase,
    private notificationService: NotificationService,
    private commandDispatcher: CommandDispatcher,
    private getWithRelationsHelper: GetWithRelationsHelper,
  ) {
    super(base, apiService);
    this.initState();
  }

  getWithRelations$(id: string, trackHistory: boolean = true):Observable<Mission>{
    if(trackHistory) this.updateLastVisited(id);

    let relationCfg = new GetWithRelationsConfig("missions", 
      {include: {missionNotes: true, missionDocuments: true, missionImages: true}});

    return this.stateSlice$(relationCfg.includedProps as any).pipe(
      map(state => this.getWithRelationsHelper.get(state as any, relationCfg, id))
    )
  }

  addFilterCriteria = (missionCriteria: MissionCriteria): void => 
    this.setState({ missionCriteria });
    
  updateHeaderImage(id: string, file: File): void {
    if(!_validateFileExtension(file, ImageFileExtensions)) 
      return this.notificationService.notify(
          {title: "Filtypen er ikke tillatt.", type: NotificationType.Error}
      );  

    let command: SaveModelFileStateCommand<Mission> = new FormToSaveModelFileStateCommandAdapter({
      formState: {id, file},
      stateProp: "missions",
      saveAction: StateAction.Update
    });

    command.apiUrlOverride = `${ApiUrl.Mission}/${id}/UpdateHeaderImage`;

    this.commandDispatcher.dispatch(command);
  }

  private updateLastVisited(id: string){
    const missions = this.getStateProperty<Mission[]>("missions", false);
    const index = missions?.findIndex(x => x.id == id);
    if(!index || !missions[index]) return;
    missions[index] = {...missions[index], lastVisited: new Date().getTime()};
    this.setState({missions})
  }

  private initState(): void {
    this.setState({
      missionCriteria: {finished: false, employer: undefined, missionType: undefined, searchString: undefined},
    }, null, false);
  }

}
