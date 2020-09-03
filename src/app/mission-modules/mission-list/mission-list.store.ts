import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Mission } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { BaseModelStore } from 'src/app/core/state/abstractions/base-model.store';
import { ModelStateSlice$ } from 'src/app/core/state/model-state-slice.type';
import { GetWithRelationsConfig } from 'src/app/core/state/store-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from 'src/app/core/state/store-helpers/get-with-relations.helper';
import { MissionFilterCriteria } from 'src/app/shared/interfaces';
import { MissionFilter } from 'src/app/shared/mission-filter.model';
import { MissionFilterConfig } from './interfaces/mission-filter-config.interface';
import { StoreState } from './interfaces/store-state';

@Injectable({
  providedIn: 'any',
})
export class MissionListStore extends BaseModelStore<StoreState>  {

  filterConfig$: Observable<MissionFilterConfig> = 
    this.stateSlice$(["missionTypes", "employers", "missions", "activeMissionSearch"]).pipe(map(cfg => {
      const filter = new MissionFilter({searchString: cfg.activeMissionSearch}, 100);
      return {...cfg, 
        missions: this.arrayHelperService.filter(cfg.missions, 
          (mission) => cfg.activeMissionSearch ? filter.check(mission) : filter.checkInitial(mission))
      } as MissionFilterConfig;
    }));

  filteredMissions$: Observable<{criteria: MissionFilterCriteria; missions: Mission[]}> = 
    combineLatest(
        this.property$<Mission[]>("missions"), 
        this.property$<MissionFilterCriteria>("missionCriteria")
    ).pipe(
        map(([missions, criteria]) => {
        let filter = new MissionFilter(criteria);
        return {
            criteria: criteria,
            missions: this.arrayHelperService.filter(missions, (m) => filter.check(m)),
        }})
      );

  get criteria(): MissionFilterCriteria {
    return this.getProperty("missionCriteria");
  }

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,
    private getWithRelationsHelper: GetWithRelationsHelper,
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
    this.initState();
  }

  getWithRelations$(id: number, trackHistory: boolean = true):Observable<Mission>{
    if(trackHistory) this.updateLastVisited(id);
    let relationCfg = new GetWithRelationsConfig("missions", {includeAll: true});
    return this.getWithRelationsHelper.get$(this.stateSlice$ as ModelStateSlice$, id, relationCfg);
  }

  addCriteria = (missionCriteria: MissionFilterCriteria): void => 
    this._setStateVoid({ missionCriteria });

  addSearch = (activeMissionSearch: string): void => this._setStateVoid({ activeMissionSearch });

  addSortByDate = (missionSortByDate: "lastVisited" | "updatedAt"): void =>
    this._setStateVoid({ missionSortByDate });

  updateHeaderImage$(command: {id: number, file: File}): Observable<void> {
    const body: FormData = new FormData();
    body.append("files", command?.file, command?.file?.name);

    return this.apiService.put(`${ApiUrl.Mission}/${command.id}/UpdateHeaderImage`, body)
        .pipe(tap(imageURL => 
          this._updateStateProperty<Mission[]>(
            "missions", 
            (state: Mission[]) => this.arrayHelperService.update(state, {id: command.id, imageURL}, 'id')
          )
        ));  
  }

  private updateLastVisited(id: number){
    let missions = this.getStateProperty<Mission[]>("missions");
    if(!missions) return;
    let index = missions.findIndex(x => x.id == id);
    if(!missions[index]) return;
    missions[index].lastVisited = new Date(); 
    this._setStateVoid({missions})
  }

  private initState(): void {
    this._setStateVoid({
      missionSortByDate: "updatedAt",
      missionCriteria: {finished: false,employerId: undefined,missionTypeId: undefined,searchString: undefined},
    });
  }

}
