import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MissionDetails, Mission, MissionType, Employer, MissionImage, MissionReport, MissionNote  } from 'src/app/shared/models';
import { ApiService } from './api.service';
import { BehaviorSubject, pipe, Observable } from 'rxjs';
import { map, filter, take, switchMap } from 'rxjs/operators';
import { MissionReportType } from 'src/app/shared/models/mission-report-type.model';
import { MissionsSubject } from '../subjects/missions.subject';

@Injectable({
  providedIn: 'root'
})

export class MissionsService {

  uri : String = "/Missions";

  constructor(
    private apiService: ApiService,
    private missionsSubject: MissionsSubject
    ) {}

  getMissionDetails(id:number): Observable<MissionDetails> {
    let details = this.missionsSubject.getMissionDetails(id);

    if(details == undefined){
      return this.apiService.get(`${this.uri}/${id}/Details`)
        .pipe(switchMap(data => {
          this.missionsSubject.addMissionDetails(data)
          return this.missionsSubject.getMissionDetails$(id);
        }));
    }
    else return this.missionsSubject.getMissionDetails$(id);
  }

  getMissionNoteDetails(missionId:number, noteId:number): Observable<MissionNote> {
    return this.getMissionDetails(missionId).pipe(switchMap(details => {
        let note = details.missionNotes.find(x => x.id == noteId);
        if(note && (note.content == null || note.content.length == 0)){ //If note exist with content
            return this.apiService.get(`${this.uri}/${missionId}/MissionNotes/${noteId}`)
              .pipe(switchMap(data => {
                this.missionsSubject.updateMissionNote(missionId, data);
                return this.missionsSubject.getMissionNoteDetails$(missionId, noteId);
              }));
        }
        else return this.missionsSubject.getMissionNoteDetails$(missionId, noteId);
    }));
  }

  addMission(mission: Mission): Observable<Mission>
  {
    console.log(mission);
    return this.apiService
            .post(`${this.uri}`, mission)
            .pipe(map(data =>{
              this.missionsSubject.addMissionDetails(new MissionDetails(data));
              console.log(data);
              return data;
            }));
  }

  addMissionImages(missionId:number, files: FileList): Observable<MissionImage[]>{
    const formData: FormData = new FormData();

    for(let i = 0; i < files.length; i++){
        formData.append('file', files[i], files[i].name);
    }

    return this
            .apiService
            .post(`${this.uri}/${missionId}/MissionImages`, formData)
            .pipe(map(imgs =>{
              this.missionsSubject.addMissionImages(missionId, imgs);
              return imgs;
            }));
  }

  addMissionReport(missionId:number, reportType: MissionReportType, files: FileList): Observable<MissionReport>{

    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    formData.append('MissionReportType',JSON.stringify(reportType));
    return this
            .apiService
            .post(`${this.uri}/${missionId}/MissionReports`,formData)
            .pipe(map(data =>{
              this.missionsSubject.addMissionReport(missionId, data);
              return data;
            }));
  }

  addMissionNote(missionId: number, note: MissionNote): Observable<MissionNote>{
    return this.apiService
            .post(`${this.uri}/${missionId}/MissionNotes`, note)
            .pipe(map(data =>{
              console.log(data);
              this.missionsSubject.addMissionNote(missionId, data);
              return data;
            }));
  }

  updateMission(mission: Mission): Observable<Mission>{
    return this
            .apiService
            .put(`${this.uri}/${mission.id}`, mission)
            .pipe(map(data =>{
              this.missionsSubject.updateMission(data);
              return data;
            }));
  }

  updateMissionNote(missionId: number, note: MissionNote): Observable<MissionNote>{
    return this
            .apiService
            .put(`${this.uri}/${missionId}/MissionNotes/${note.id}`, note)
            .pipe(map(data =>{
              this.missionsSubject.updateMissionNote(missionId, data);
              return data;
            }));
  }

  deleteMission(id: number): Observable<boolean> {
    return this
            .apiService
            .delete(`${this.uri}/${id}`)
            .pipe(map(bool =>{
              if(bool)
                this.missionsSubject.removeMissionDetails(id);
              return bool;
          }));
  }

  deleteMissionImage(missionId: number, imageId: number){
    return this
    .apiService
    .delete(`${this.uri}/${missionId}/MissionImages/${imageId}`)
    .pipe(map(bool =>{
      if(bool)
        this.missionsSubject.removeMissionImage(missionId, imageId);

      return bool;
    }));
  }

  deleteMissionNote(missionId: number, noteId: number): Observable<boolean> {
    return this
            .apiService
            .delete(`${this.uri}/${missionId}/MissionNotes/${noteId}`)
            .pipe(map(bool =>{
              if(bool)
                this.missionsSubject.removeMissionNote(missionId, noteId);
              return bool;
          }));
  }

  toggleFinish(mission: Mission): Observable<Mission>{
    return this.apiService
      .get(`${this.uri}/${mission.id}/ToggleFinish`)
      .pipe(map(bool =>{
        mission.finished = bool;
        this.missionsSubject.updateMission(mission);
        return mission;
    }));
  }

}
