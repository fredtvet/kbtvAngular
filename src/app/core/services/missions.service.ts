import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MissionDetails } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})

export class MissionsService {

  uri : String;

  constructor(private http: HttpClient) {this.uri = environment.apiUrl + '/missions'}

  addMission(mission: any)
  {
    return this.http
            .post<number>(`${this.uri}`, mission);

  }

  getMissionsPaginated(pageId: number = 0, searchString?: string) {
    if(searchString == null || searchString.length == 0){
      return this
        .http
        .get(`${this.uri}?pageId=${pageId}`);
    }else{
      return this
      .http
      .get(`${this.uri}?searchString=${searchString}&pageId=${pageId}`);
    }
  }

  getMission(id) {
    return this
            .http
            .get(`${this.uri}/${id}`);
  }

  getMissionDetails(id) {
    return this
           .http
           .get<MissionDetails>(`${this.uri}/${id}/Details`);
  }

  updateMission(mission: any)
  {
    return this
            .http
            .put<boolean>(`${this.uri}/${mission.id}`, mission);
  }

  toggleFinish(id){
    return this.http
      .get<number>(`${this.uri}/${id}/ToggleFinish`);
  }

  deleteMission(id) {
    return this
            .http
            .delete(`${this.uri}/${id}`);
  }
}
