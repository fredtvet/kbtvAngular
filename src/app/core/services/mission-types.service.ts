import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MissionType } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})

export class MissionTypesService {

  uri : String;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.uri = environment.apiUrl + '/MissionTypes'; }

  addMissionType(Name: string)
  {
    const obj = {
      Name
    };

    return this
            .http
            .post(`${this.uri}`, obj);
  }

  getMissionTypes() {
       return this
        .http
        .get<MissionType[]>(`${this.uri}`);
  }

  updateMissionType(Name: string, id)
  {
    const obj = {
      Name
    };

    return this
            .http
            .put(`${this.uri}/${id}`, obj);
  }

  deleteMissionType(id) {
    return this
            .http
            .delete(`${this.uri}/${id}`);
  }
}
