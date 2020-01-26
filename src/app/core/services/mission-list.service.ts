import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class MissionListService {

  uri : String = "/Missions";

  constructor(private apiService: ApiService) {}

  getMissionsPaginated(pageId: number = 0, searchString?: string) {
    if(searchString == null || searchString.length == 0){
      return this
        .apiService
        .get(`${this.uri}?pageId=${pageId}`);
    }else{
      return this
        .apiService
        .get(`${this.uri}?searchString=${searchString}&pageId=${pageId}`);
    }
  }

}
