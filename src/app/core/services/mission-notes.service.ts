import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MissionNote } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})

export class MissionNotesService {

  uri : String;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.uri = environment.apiUrl + '/missions'; }

  addNote(missionId, note: any)
  {
    return this.http
            .post<number>(`${this.uri}/${missionId}/MissionNotes`, note, {headers: { 'Content-Type': 'application/json'}});

  }

  getNote(missionId, id) {
    return this
            .http
            .get<MissionNote>(`${this.uri}/${missionId}/MissionNotes/${id}`);
  }

  updateNote(missionId, note: any)
  {
    return this
            .http
            .put<boolean>(`${this.uri}/${missionId}/MissionNotes/${note.id}`, note, {headers: { 'Content-Type': 'application/json'}});
  }

  deleteNote(missionId, id) {
    return this
            .http
            .delete(`${this.uri}/${missionId}/MissionNotes/${id}`);
  }
}
