import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MissionDetails, Mission, MissionType, Employer, MissionImage, MissionReport, MissionNote  } from 'src/app/shared/models';
import { ApiService } from './api.service';
import { BehaviorSubject, pipe, Observable } from 'rxjs';
import { map, filter, take, switchMap, tap, delay } from 'rxjs/operators';
import { MissionReportType } from 'src/app/shared/models/mission-report-type.model';
import { MissionsSubject } from '../subjects/missions.subject';
import { MissionListService } from './mission-list.service';

@Injectable({
  providedIn: 'root'
})

export class MissionsService {

  uri : String = "/Missions";

  constructor(
    private apiService: ApiService,
    private missionListService: MissionListService,
    private missionsSubject: MissionsSubject
    ) {}

  getMissionDetails(id:number): Observable<MissionDetails> {
    if(this.missionsSubject.hasDetails(id))
      return this.missionsSubject.getDetails$(id);
    else {
      return this.apiService.get(`${this.uri}/${id}/Details`)
        .pipe(switchMap(data => {
          this.missionsSubject.addDetails(data)
          return this.missionsSubject.getDetails$(id);
        }));
    }
  }

  addMission(mission: Mission): Observable<Mission>
  {
    return this.apiService
            .post(`${this.uri}`, mission)
            .pipe(map(data =>{
              this.missionsSubject.addDetails(new MissionDetails(data));
              this.missionListService.addMissionToInitalList(data);
              return data;
            }));
  }

  updateMission(mission: Mission): Observable<Mission>{
    if(mission.phoneNumber != null && mission.phoneNumber.length == 0) mission.phoneNumber = null; //Workaround
    return this
            .apiService
            .put(`${this.uri}/${mission.id}`, mission)
            .pipe(map(data =>{
              this.missionsSubject.updateMission(data);
              this.missionListService.updateMissionInInitalList(data);
              return data;
            }));
  }

  deleteMission(id: number): Observable<boolean> {
    return this
            .apiService
            .delete(`${this.uri}/${id}`)
            .pipe(map(bool =>{
              if(bool){
                this.missionsSubject.removeDetails(id);
                this.missionListService.populateInitalList(); //Reset mission list
              }
              return bool;
          }));
  }

  loadMissionNoteDetails(missionId:number, noteId:number): void {
    this.apiService.get(`${this.uri}/${missionId}/MissionNotes/${noteId}`)
      .subscribe(data =>  {
        console.log('http');
        this.missionsSubject.updateNote(missionId, data)
      });
  }

  getMissionNoteDetails(missionId:number, noteId:number): Observable<MissionNote> {
    return this.getMissionDetails(missionId).pipe(switchMap(details => {
        let note = details.missionNotes.find(x => x.id == noteId);
        if(note && (note.content == null || note.content.length == 0)){ //If note exist with content
            return this.apiService.get(`${this.uri}/${missionId}/MissionNotes/${noteId}`)
              .pipe(switchMap(data => {
                this.missionsSubject.updateNote(missionId, data);
                return this.missionsSubject.getNoteDetails$(missionId, noteId);
              }));
        }
        else return this.missionsSubject.getNoteDetails$(missionId, noteId);
    }));
  }

  addMissionNote(missionId: number, note: MissionNote): Observable<MissionNote>{
    return this.apiService
            .post(`${this.uri}/${missionId}/MissionNotes`, note)
            .pipe(map(data =>{
              console.log(data);
              this.missionsSubject.addNote(missionId, data);
              return data;
            }));
  }

  updateMissionNote(missionId: number, note: MissionNote): Observable<MissionNote>{
    return this
            .apiService
            .put(`${this.uri}/${missionId}/MissionNotes/${note.id}`, note)
            .pipe(map(data =>{
              this.missionsSubject.updateNote(missionId, data);
              return data;
            }));
  }

  deleteMissionNote(missionId: number, noteId: number): Observable<boolean> {
    return this
            .apiService
            .delete(`${this.uri}/${missionId}/MissionNotes/${noteId}`)
            .pipe(map(bool =>{
              if(bool) this.missionsSubject.deleteNote(missionId, noteId);
              return bool;
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
              this.missionsSubject.addImages(missionId, imgs);
              return imgs;
            }));
  }

  deleteMissionImage(missionId: number, imageId: number): Observable<boolean> {
    return this
    .apiService
    .delete(`${this.uri}/${missionId}/MissionImages/${imageId}`)
    .pipe(map(bool =>{
      if(bool) this.missionsSubject.deleteImage(missionId, imageId);
      return bool;
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
              this.missionsSubject.addReport(missionId, data);
              return data;
            }));
  }

  deleteMissionReport(missionId: number, reportId: number): Observable<boolean> {
    return this
    .apiService
    .delete(`${this.uri}/${missionId}/MissionReports/${reportId}`)
    .pipe(map(bool =>{
      if(bool) this.missionsSubject.deleteReport(missionId, reportId);
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
