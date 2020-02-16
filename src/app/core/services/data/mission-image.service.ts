import { Injectable, Inject } from '@angular/core';
import { MissionImageSubject } from '../../subjects/mission-image.subject';
import { ApiService } from '../api.service';
import { BaseMissionChildService } from './base-mission-child.service';
import { MissionImage } from 'src/app/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionService } from '../connection.service';

@Injectable({
  providedIn: 'root'
})
export class MissionImageService extends BaseMissionChildService<MissionImage> {

  constructor(
    apiService: ApiService,
    dataSubject: MissionImageSubject,
    connectionService: ConnectionService,
  ){
    super(apiService, dataSubject, connectionService);
  }

  getByMissionId$(missionId: number):Observable<MissionImage[]>{
    return super.getByMissionId$(missionId); //No http support
  }

  addImages$(missionId:number, files: FileList): Observable<MissionImage[]>{
    if(!this.isOnline) return null;
    this.setUrl(missionId);
    const formData: FormData = new FormData();

    for(let i = 0; i < files.length; i++){
        formData.append('file', files[i], files[i].name);
    }

    return this.apiService
                .post(`${this.uri}`, formData)
                .pipe(map(data =>{
                  this.dataSubject.addOrUpdateRange(data);
                  return data;
                }));
  }

  delete$(id: number): Observable<boolean> {
    this.setUrl();
    return super.delete$(id);
  }

  setUrl(missionId: number = null): void{
    if(missionId !== null) this.uri = `/Missions/${missionId}/MissionImages`;
    else this.uri = `/Missions/MissionImages/`;
  }

  getAll$(): Observable<MissionImage[]> {return undefined}

  get$(id: number):Observable<MissionImage> {return undefined}

  add$(entity: MissionImage): Observable<MissionImage>{return undefined}

  update$(entity: MissionImage): Observable<MissionImage>{return undefined}

}
