import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Mission, MissionDocument, MissionImage, MissionNote } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { OnStateAdd, OnStateDelete, OnStateUpdate, OptimisticFormStore } from "../../core/state";
import { CreateMission, UpdateMission } from './interfaces/mission-commands.interface';
import { StoreState } from './interfaces/store-state';

@Injectable({
  providedIn: 'any',
})
export class MissionFormStore extends OptimisticFormStore<StoreState> implements OnStateAdd, OnStateUpdate, OnStateDelete  {

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, "missions");
    console.log("MissionFormStore")
  }

  getMissionById$ = (id: number): Observable<Mission> => super._getById$("missions", id, "id")
 
  add$(command: CreateMission): Observable<void> {

    const optimisticEntity: Mission = {
      id: 0,
      address: command.address,
      phoneNumber: command.phoneNumber,
      description: command.description
    };

    const body: FormData = new FormData();
    if (command.image) body.append("files", command.image, command.image.name);
    delete command.image;
    body.append("command", JSON.stringify(command));

    return this._add$(this.apiService.post(ApiUrl.Mission, body), optimisticEntity);
  }

  update$(command: UpdateMission): Observable<void> {
    const optimisticEntity: Mission = {
      id: command.id,
      finished: command.finished,
      address: command.address,
      phoneNumber: command.phoneNumber,
      description: command.description
    };

    return this._update$(this.apiService.put(`${ApiUrl.Mission}/${command.id}`, command), optimisticEntity)
  }

  delete$ = (id: number): Observable<void> => this._delete$(id); 

  addFromPdfReport$(pdf: File): Observable<void> {
    const body: FormData = new FormData();
    if (pdf) body.append("files", pdf, pdf.name);
    
    return this._add$(
      this.apiService.post(`${ApiUrl.Mission}/CreateFromPdfReport`, body), 
      {id: 0}, 
      this.addStateFromPdfReportResponse
    );
  }

  private addStateFromPdfReportResponse = (response: {mission: Mission, document: MissionDocument}) => {
    let state = {} as Partial<StoreState>;
    state.missions = this.arrayHelperService.add(this.getProperty("missions", false), response.mission);
    state.missionDocuments = this.arrayHelperService.add(this.getProperty("missionDocuments", false), response.document)        
    this._setStateVoid(state);
  }
  
} 