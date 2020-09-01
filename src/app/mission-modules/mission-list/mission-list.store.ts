import { Observable, combineLatest } from "rxjs";
import { map, tap, filter } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  ApiService,
  ArrayHelperService,
} from "src/app/core/services";
import { Mission, Employer, MissionType, MissionImage, MissionDocument, MissionNote } from "src/app/core/models";
import { BaseModelStore } from "../../core/state";
import { MissionDetails } from './interfaces/mission-details.interface';
import { StoreState } from './interfaces/store-state';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { MissionFilterConfig } from './interfaces/mission-filter-config.interface';
import { MissionFilter } from 'src/app/shared/mission-filter.model';
import { MissionFilterCriteria } from 'src/app/shared/interfaces';

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
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
    this.initState();
  }

  getDetails$(id: number, trackHistory: boolean = true):Observable<MissionDetails>{
    if(trackHistory) this.updateLastVisited(id);
    return combineLatest(
        this._getById$<Mission>("missions", id, "id"),
        this._getBy$<MissionImage>("missionImages", (x) => x.missionId === id).pipe(map(x => x?.length)),       
        this._getBy$<MissionDocument>("missionDocuments", (x) => x.missionId === id).pipe(map(x => x?.length)),     
        this._getBy$<MissionNote>("missionNotes", (x) => x.missionId === id).pipe(map(x => x?.length)), 
        this.property$<Employer[]>("employers"), 
        this.property$<MissionType[]>("missionTypes")
    ).pipe(
        map(([mission, imageCount, documentCount, noteCount, employers, types]) => {
            let details:  MissionDetails = {mission, imageCount, documentCount, noteCount};
            if(!mission) return details;
            details.mission.employer = this.arrayHelperService.find(employers, details.mission?.employerId, 'id');
            details.mission.missionType = this.arrayHelperService.find(types, details.mission?.missionTypeId, 'id');
            return details;
        })
    );
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
