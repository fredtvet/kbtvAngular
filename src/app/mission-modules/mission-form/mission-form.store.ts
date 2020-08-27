import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url';
import { Mission, MissionImage, MissionDocument, MissionNote } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { BaseModelStore, OnStateAdd, OnStateUpdate, OnStateDelete } from "../../core/state";
import { CreateMission, UpdateMission } from './interfaces/mission-commands.interface';
import { StoreState } from './interfaces/store-state';
import { StoreActions } from 'src/app/profile/profile.store';

@Injectable({
  providedIn: 'any',
})
export class MissionFormStore extends BaseModelStore<StoreState> implements OnStateAdd, OnStateUpdate, OnStateDelete  {

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
            this.modifyMissionWithForeigns(entity,
              (entity) => this.arrayHelperService.add(this.getProperty("missions", false), entity))
        ));  
  }

  update$(command: UpdateMission): Observable<void> {
    return this.apiService.put(ApiUrl.Mission + '/' + command.id, command)
        .pipe(tap(entity => 
            this.modifyMissionWithForeigns(entity, 
              (entity) => this.arrayHelperService.update(this.getProperty("missions", false), entity, 'id'))
        ));  
  }

  delete$ = (id: number): Observable<void> =>
    this.apiService.delete(ApiUrl.Mission + '/' + id).pipe(tap(x => this.deleteMissionWithChildren(id))); 

  addFromPdfReport$(pdf: File): Observable<void> {
    const body: FormData = new FormData();
    if (pdf) body.append("files", pdf, pdf.name);

    return this.apiService
      .post(`${ApiUrl.Mission}/CreateFromPdfReport`, body)
      .pipe(tap(entity => {
        let state = {} as Partial<StoreState>;
        state.missions = this.arrayHelperService.add(this.getProperty("missions", false), entity);
        state.missionDocuments = this.arrayHelperService.add(this.getProperty("missionDocuments", false), entity)        
        this._setStateVoid(state);
      }));  
  }

  //Add foreign properties (multiple properties can be created in single API call)
  private modifyMissionWithForeigns
    (m: Mission, actionFn: (entity: Mission) => Mission[]): void{
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

    this._setStateVoid(state);
  }

  private deleteMissionWithChildren(id: number): void{
    let missions = this.getStateProperty<Mission[]>("missions");
    let state: Partial<StoreState> = {
        missions: this.arrayHelperService.removeByIdentifier(missions, id, 'id'),
        missionImages: this.arrayHelperService.filter(this.getStateProperty<MissionImage[]>("missionImages"), (x) => x.missionId !== id),       
        missionDocuments: this.arrayHelperService.filter(this.getStateProperty<MissionDocument[]>("missionDocuments"), (x) => x.missionId !== id),    
        missionNotes: this.arrayHelperService.filter(this.getStateProperty<MissionNote[]>("missionNotes"), (x) => x.missionId !== id),
    }
    this._setStateVoid(state);
  }
  
}