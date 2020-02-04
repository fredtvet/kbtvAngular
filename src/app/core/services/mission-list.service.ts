import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MissionList } from 'src/app/shared/models/mission-list.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mission } from 'src/app/shared/models/mission.model';

@Injectable({
  providedIn: 'root'
})

export class MissionListService {

  uri : String = "/Missions";

  private initalListSubject =
          new BehaviorSubject<MissionList>(new MissionList());

  constructor(private apiService: ApiService) {}

  populateInitalList(){ //Called at app start
    this.apiService
      .get(`${this.uri}?onlyActive=true`)
      .subscribe(data => this.initalListSubject.next(data));
  }

  getMissionsPaginated(onlyActive: boolean = true, pageId: number = 0, searchString?: string): Observable<MissionList> {

    if((pageId == 0 || pageId == null) && (searchString == null || searchString.length == 0) && onlyActive == true){
      return this.initalListSubject.asObservable(); //Return initial list if default parameters
    }

    return this
      .apiService
      .get(`${this.uri}?searchString=${searchString}&pageId=${pageId}&onlyActive=${onlyActive}`);
  }

  addMissionToInitalList(mission: Mission){
    this.initalListSubject.value.missions.unshift(mission);
    this.initalListSubject.value.missions.pop();
  }

  updateMissionInInitalList(mission: Mission){
    this.initalListSubject.value.missions = this.initalListSubject.value.missions.map(m => {
      if(m.id === mission.id) m = mission;
      return m;
    });
  }

}
