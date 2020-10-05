import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Mission, User } from "src/app/core/models";
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { ApiService } from 'src/app/core/services/api.service';
import { SaveModelFileToStateHttpConverter } from 'src/app/core/services/model/converters/save-model-file-to-state-http.converter';
import { NotificationService } from 'src/app/core/services/notification';
import { NotificationType } from 'src/app/core/services/notification/notification-type.enum';
import { StateHttpCommandHandler } from "src/app/core/services/state/state-http-command.handler";
import { ImageFileExtensions } from 'src/app/shared/constants/image-file-extensions.const';
import { _validateFileExtension } from 'src/app/shared-app/helpers/validate-file-extension.helper';
import { MissionCriteria } from 'src/app/shared/interfaces';
import { MissionFilter } from 'src/app/shared/mission-filter.model';
import { StoreState } from './interfaces/store-state';
import { MissionFilterViewConfig } from './mission-filter-view/mission-filter-view-config.interface';
import { _filter } from 'src/app/shared-app/helpers/array/filter.helper';
import { _sortByDate } from 'src/app/shared-app/helpers/array/sort-by-date.helper';
import { FilterStore, FilteredResponse } from 'src/app/core/services/filter/interfaces';
import { SaveModelWithFileStateCommand } from 'src/app/core/services/model/interfaces';
import { GetWithRelationsConfig } from 'src/app/core/services/model/state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from 'src/app/core/services/model/state-helpers/get-with-relations.helper';
import { BaseModelStore } from 'src/app/core/services/state/abstracts/base-model.store';
import { StateAction } from 'src/app/core/services/state/state-action.enum';
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';

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
    this.stateSlice$(["missions", "missionCriteria"], false).pipe(
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
    private stateHttpCommandHandler: StateHttpCommandHandler,
    private saveWithFileStateHttpConverter: SaveModelFileToStateHttpConverter<StoreState, SaveModelWithFileStateCommand<Mission>>,
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
    
    this.stateHttpCommandHandler.dispatch(
      this.saveWithFileStateHttpConverter.convert(
        {stateProp: "missions", entity: {id}, file, saveAction: StateAction.Update},
        `${ApiUrl.Mission}/${id}/UpdateHeaderImage`
      )
    )
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
