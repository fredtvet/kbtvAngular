import { Observable, combineLatest } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  ApiService,
  ArrayHelperService,
  SorterService,
} from "src/app/core/services";
import { Mission, Employer, MissionType, MissionImage, MissionDocument, MissionNote } from "src/app/core/models";
import { BaseModelStore } from "../../core/state";
import { MissionFilter } from "./mission.filter";
import { MissionFilterCriteria } from './interfaces/mission-filter-criteria.interface';
import { MissionDetails } from './interfaces/mission-details.interface';
import { StoreState } from './interfaces/store-state';
import { ApiUrl } from 'src/app/core/api-url';

@Injectable({
  providedIn: 'any',
})
export class MissionListStore extends BaseModelStore<StoreState>  {

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

  filteredAndSortedMissions$: Observable<{criteria: MissionFilterCriteria;sortBy: string; missions: Mission[]}> = 
    combineLatest(this.filteredMissions$, this.property$<string>("missionSortByDate"))
      .pipe(
        map(([filtered, sortBy]) => {
        this.sorterService.sort(filtered.missions, sortBy);
        return {
            missions: filtered.missions,
            criteria: filtered.criteria,
            sortBy,
        }})
      );

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,
    private sorterService: SorterService
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
    this._setStateVoid({ missionCriteria },StoreActions.UpdateCriteriaMission);

  addSortByDate = (missionSortByDate: "lastVisited" | "updatedAt"): void =>
    this._setStateVoid({ missionSortByDate },StoreActions.UpdateSortByDateMission);

  updateHeaderImage$(command: {id: number, file: File}): Observable<void> {
    const body: FormData = new FormData();
    body.append("files", command?.file, command?.file?.name);

    return this.apiService.put(`${ApiUrl.Mission}/${command.id}/UpdateHeaderImage`, body)
        .pipe(tap(imageURL => 
          this._updateStateProperty<Mission[]>("missions", (state: Mission[]) => this.arrayHelperService.update(state, {imageURL}, 'id'))
        ));  
  }

  private updateLastVisited(id: number){
    let missions = this.getStateProperty<Mission[]>("missions");
    if(!missions) return;
    let index = missions.findIndex(x => x.id == id);
    if(!missions[index]) return;
    missions[index].lastVisited = new Date(); 
    this._setStateVoid({missions}, StoreActions.UpdateLastVisitedMission)
  }

  private initState(): void {
    this._setStateVoid({
        missionSortByDate: "updatedAt",
        missionCriteria: {finished: false,employerId: undefined,missionTypeId: undefined,searchString: undefined},
      }, StoreActions.InitState
    );
  }

}

export enum StoreActions {
  InitState = "initState_missions",
  DeleteMission = "delete_missions",
  UpdateCriteriaMission = "update_Criteria_missions",
  UpdateSortByDateMission = "updateSortByDate_missions", 
  UpdateLastVisitedMission = "updateLastVisited_missions",
  UpdateHeaderImageMission = "updateHeaderImage_missions"
}
