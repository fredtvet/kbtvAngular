import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url';
import { Mission } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { BaseModelStore } from "../../core/state";
import { CreateMission, UpdateMission } from './interfaces/mission-commands.interface';
import { StoreState } from './interfaces/store-state';

@Injectable({
  providedIn: 'any',
})
export class MissionFormStore extends BaseModelStore<StoreState>  {

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
  }

  getMissionById$ = (id: number): Observable<Mission> => super._getById$("missions", id, "id")
 
  add$(command: CreateMission): Observable<void> {
    const body: FormData = new FormData();
    if (command.image) body.append("files", command.image, command.image.name);
    delete command.image;
    body.append("command", JSON.stringify(command));

    return this.apiService.post(ApiUrl.Mission, body)
        .pipe(tap(entity => 
            this.modifyMissionWithForeigns(entity, StoreActions.AddMission, 
              (entity) => this.arrayHelperService.add(this.getProperty("missions", false), entity))
        ));  
  }

  update$(command: UpdateMission): Observable<void> {
    return this.apiService.put(ApiUrl.Mission + '/' + command.id, command)
        .pipe(tap(entity => 
            this.modifyMissionWithForeigns(entity, StoreActions.UpdateMission, 
              (entity) => this.arrayHelperService.update(this.getProperty("missions", false), entity, 'id'))
        ));  
  }

  addFromPdfReport$(pdf: File): Observable<void> {
    const body: FormData = new FormData();
    if (pdf) body.append("files", pdf, pdf.name);

    return this.apiService
      .post(`${ApiUrl.Mission}/CreateFromPdfReport`, body)
      .pipe(tap(entity => {
        let state = {} as Partial<StoreState>;
        state.missions = this.arrayHelperService.add(this.getProperty("missions", false), entity);
        state.missionDocuments = this.arrayHelperService.add(this.getProperty("missionDocuments", false), entity)        
        this._setStateVoid(state, StoreActions.AddMissionFromPdf);
      }));  
  }

  //Add foreign properties (multiple properties can be created in single API call)
  private modifyMissionWithForeigns
    (m: Mission, action: string, actionFn: (entity: Mission) => Mission[]): void{
    let state: Partial<StoreState> = {};
    if(m?.missionType?.id){ 
      state.missionTypes = this.arrayHelperService.add(this.getProperty("missionTypes"), m.missionType)
      m.missionTypeId = m.missionType.id;
      m.missionType = null; //Clean up
    }
    if(m?.employer?.id){
      state.employers = this.arrayHelperService.add(this.getProperty("employers"), m.employer)
      m.employerId = m.employer.id;
      m.employer = null; //Clean up
    }
    state.missions = actionFn(m);

    this._setStateVoid(state, action);
  }

}

export enum StoreActions {
  AddMission = "add_missions",
  AddMissionFromPdf = "addFromPdf_missions",
  UpdateMission = "update_missions",
}
