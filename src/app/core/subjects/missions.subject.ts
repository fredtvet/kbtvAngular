import { Injectable } from '@angular/core';
import { MissionDetails, Mission,MissionImage, MissionReport, MissionNote  } from 'src/app/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployersSubject } from './employers.subject';
import { MissionTypesSubject } from './mission-types.subject';
import { MissionReportTypesSubject } from './mission-report-types.subject';

@Injectable({
  providedIn: 'root'
})

export class MissionsSubject {

  private missionsSubject =
          new BehaviorSubject<MissionDetails[]>([]);

  public missions$ = this.missionsSubject.asObservable();

  constructor(
    private missionTypesSubject: MissionTypesSubject,
    private employersSubject: EmployersSubject,
    private missionReportTypesSubject: MissionReportTypesSubject) {}

  getDetails$(id: number): Observable<MissionDetails>{
    return this.missions$.pipe(map(arr => arr.find(details => details.mission.id == id)));
  }

  addDetails(details: MissionDetails){
    let missions = this.missionsSubject.value;
    missions.push(details);
    this.missionsSubject.next(missions);
    //Update relating subjects

    if(details.mission.missionType && details.mission.missionType.id != 0)
      this.missionTypesSubject.add(details.mission.missionType);
    if(details.mission.employer && details.mission.employer.id != 0)
      this.employersSubject.add(details.mission.employer);
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

    if(mission.missionType && mission.missionType.id != 0)
      this.missionTypesSubject.add(mission.missionType);
    if(mission.employer && mission.employer.id != 0)
      this.employersSubject.add(mission.employer);
  }

  removeDetails(id: number){
    this.missionsSubject.next(
      this.missionsSubject.value.filter(d => {
        return d.mission.id !== id
      })
    );
  }

  hasDetails(id:number): boolean {
    let details = this.missionsSubject.value.find(details => details.mission.id == id);
    if(details == undefined) return false;
    else return true;
  }

  addImages(missionId:number, images: MissionImage[]){
    this.missionsSubject.next(
      this.missionsSubject.value.map(d => {
        if(d.mission.id == missionId) {
          d.missionImages = d.missionImages.concat(images);
        }
        return d;
      })
    );
  }

  deleteImage(missionId: number, imageId: number){
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

  addReport(missionId:number, report: MissionReport){
    this.missionsSubject.next(
      this.missionsSubject.value.map(d => {
        if(d.mission.id == missionId) {
          d.missionReports.push(report);
        }
        return d;
      })
    );

    if(report.missionReportType && report.missionReportType.id != 0)
      this.missionReportTypesSubject.add(report.missionReportType);
  }

  deleteReport(missionId: number, reportId: number){
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


  getNoteDetails$(missionId:number, noteId:number): Observable<MissionNote>{
    return this.missions$.pipe(map(missions => {
        return missions.find(m => m.mission.id == missionId)
                .missionNotes.find(m => m.id == noteId);
    }));
  }

  addNote(missionId:number, note: MissionNote){
    this.missionsSubject.next(
      this.missionsSubject.value.map(d => {
        if(d.mission.id == missionId) d.missionNotes.push(note);
        return d;
      })
    );
  }

  updateNote(missionId: number, note: MissionNote){
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

  deleteNote(missionId: number, noteId: number){
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




}
