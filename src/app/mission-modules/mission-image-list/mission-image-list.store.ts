import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { ApiUrl } from 'src/app/core/api-url.enum';
import { Employer, Mission, MissionImage } from "src/app/core/models";
import {
  ApiService,
  ArrayHelperService
} from "src/app/core/services";
import { BaseModelStore } from "../../core/state";
import { StoreState } from './store-state';

@Injectable({
  providedIn: 'any',
})
export class MissionImageListStore extends BaseModelStore<StoreState>  {

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
  }

  getByMissionId$ = (id: number): Observable<MissionImage[]> => 
    this._getBy$("missionImages", (img: MissionImage) => img.missionId === id);

  getMissionEmployer(missionId: number): Employer{
    let mission = this.arrayHelperService.find(this.getProperty<Mission[]>("missions", false), missionId, 'id');
    if(!mission?.employerId) return null;
    let employer = this.arrayHelperService.find(this.getProperty<Employer[]>("employers", false), mission.employerId, 'id');
    return {...employer}
  }
 
  add$(command: {missionId: number, files: FileList}): Observable<void> {
    if(!command) return throwError('no command provided');
    const formData: FormData = new FormData();

    for(let i = 0; i < command.files.length; i++){
        formData.append('file', command.files[i], command.files[i].name);
    }

    return this.apiService.post(`${ApiUrl.MissionImage}?missionId=${command.missionId}`, formData)
        .pipe(
          tap(x => this._updateStateProperty(
            "missionImages", 
            (imgs: MissionImage[]) => this.arrayHelperService.add(imgs, x)))
        );  
  }

  mailImages$(toEmail: string, missionImageIds: number[]){
    return this.apiService
              .post(`${ApiUrl.MissionImage}/SendImages`, {toEmail, missionImageIds});
  }

  delete$(id: number): Observable<void> {
    return this.apiService.delete(`${ApiUrl.MissionImage}/${id}`)    
        .pipe(
          tap(x => this._updateStateProperty(
            "missionImages", 
            (imgs: MissionImage[]) => this.arrayHelperService.removeByIdentifier(imgs, id, 'id')))
        );   
  }

  deleteRange$(ids: number[]): Observable<void> {
    return this.apiService.post(`${ApiUrl.MissionImage}/DeleteRange`, {Ids: ids})    
        .pipe(
          tap(x => this._updateStateProperty(
            "missionImages", 
            (imgs: MissionImage[]) => this.arrayHelperService.removeRangeByIdentifier(imgs, ids, 'id')))
        );   
  }
}