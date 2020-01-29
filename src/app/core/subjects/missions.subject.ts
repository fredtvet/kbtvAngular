import { Injectable } from '@angular/core';
import { MissionDetails, Mission,MissionImage, MissionReport, MissionNote  } from 'src/app/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MissionReportTypesService } from '../services/mission-report-types.service';
import { MissionTypesService } from '../services/mission-types.service';
import { EmployersService } from '../services/employers.service';

@Injectable({
  providedIn: 'root'
})

export class MissionsSubject {

  private missionsSubject =
          new BehaviorSubject<MissionDetails[]>([]);

  public missions$ = this.missionsSubject.asObservable();

  constructor(
    private missionTypesService: MissionTypesService,
    private employersService: EmployersService,
    private missionReportTypesService: MissionReportTypesService) {}

  getMissionDetails(id:number): MissionDetails{
    return this.missionsSubject.value.find(details => details.mission.id == id);
  }

  getMissionDetails$(id: number): Observable<MissionDetails>{
    return this.missions$.pipe(map(arr => arr.find(details => details.mission.id == id)));
  }

  addMissionDetails(details: MissionDetails){
    let missions = this.missionsSubject.value;
    missions.push(details);
    this.missionsSubject.next(missions);
    //Update relating subjects
    if(details.mission.missionType && details.mission.missionType.id != 0)
      this.missionTypesService.addMissionTypeInSubject(details.mission.missionType);
    if(details.mission.employer && details.mission.employer.id != 0)
      this.employersService.addEmployerInSubject(details.mission.employer);
  }

  removeMissionDetails(id: number){
    this.missionsSubject.next(
      this.missionsSubject.value.filter(d => {
        return d.mission.id !== id
      })
    );
  }

  updateMission(mission: Mission){
    this.missionsSubject.next(
      this.missionsSubject.value.map(d => {
        if(d.mission.id === mission.id) {
          d.mission = mission;
        }
        return d;
      })
    );
  }

  addMissionImages(missionId:number, images: MissionImage[]){
    this.missionsSubject.next(
      this.missionsSubject.value.map(d => {
        if(d.mission.id == missionId) {
          d.missionImages = d.missionImages.concat(images);
        }
        return d;
      })
    );
  }

  removeMissionImage(missionId: number, imageId: number){
    this.missionsSubject.next(
      this.missionsSubject.value.map(d => {
        if(d.mission.id == missionId) {
          d.missionImages = d.missionImages.filter(i => {
            return i.id !== imageId
          })
        }
        return d;
      })
    );
  }

  addMissionReport(missionId:number, report: MissionReport){
    this.missionsSubject.next(
      this.missionsSubject.value.map(d => {
        if(d.mission.id == missionId) {
          d.missionReports.push(report);
        }
        return d;
      })
    );

    if(report.missionReportType)
      this.missionReportTypesService.addMissionReportTypeInSubject(report.missionReportType);
  }

  removeMissionReport(missionId: number, reportId: number){
    this.missionsSubject.next(
      this.missionsSubject.value.map(d => {
        if(d.mission.id == missionId) {
          d.missionReports = d.missionReports.filter(i => {
            return i.id !== reportId
          })
        }
        return d;
      })
    );
  }

  addMissionNote(missionId:number, note: MissionNote){
    this.missionsSubject.next(
      this.missionsSubject.value.map(d => {
        if(d.mission.id == missionId) d.missionNotes.push(note);
        return d;
      })
    );
  }

  removeMissionNote(missionId: number, noteId: number){
    this.missionsSubject.next(
      this.missionsSubject.value.map(d => {
        if(d.mission.id == missionId) {
          d.missionNotes = d.missionNotes.filter(i => {
            return i.id != noteId
          });
        }
        return d;
      })
    );
  }

  updateMissionNote(missionId: number, note: MissionNote){
    this.missionsSubject.next(
      this.missionsSubject.value.map(d => {
        if(d.mission.id == missionId) {
          d.missionNotes = d.missionNotes.map(n => {
            if(n.id == note.id) return note;
            else return n;
          });
        }
        return d;
      })
    );
  }

  getMissionNoteDetails(missionId:number, noteId:number): MissionNote{
    let mission = this.missionsSubject.value.find(details => details.mission.id == missionId);
    if(mission){
      let note = mission.missionNotes.find(note => note.id == noteId);
      if(note) return note;
    }
    return new MissionNote();
  }

  getMissionNoteDetails$(missionId:number, noteId:number): Observable<MissionNote>{
    return this.missions$.pipe(map(missions => {
        return missions.find(m => m.mission.id == missionId)
                .missionNotes.find(m => m.id == noteId);
    }));
  }

}
