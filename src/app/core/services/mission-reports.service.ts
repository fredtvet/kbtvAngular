import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MissionReportsService {

  uri : String;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.uri = environment.apiUrl  + '/Missions'; }

  uploadReport(missionId, files: FileList, typeId: string)
  {
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    return this.http
            .post<any>(`${this.uri}/${missionId}/MissionReports?typeId=${typeId}`,formData)
  }

  deleteReport(missionId, id) {
    return this.http
            .delete<boolean>(`${this.uri}/${missionId}/MissionReports/${id}`)
  }

  getTypes(){
    return this
      .http
      .get(`${this.uri}/MissionReports/Types`);
  }
}
