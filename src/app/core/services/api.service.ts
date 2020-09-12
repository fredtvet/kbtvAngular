import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
    ) {}

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params })
      .pipe(catchError(x => this.handleErrors(x)));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put( `${environment.apiUrl}${path}`, body)
      .pipe(catchError(this.handleErrors))
    
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${path}`, body)
      .pipe(catchError(x => this.handleErrors(x)))
    
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${path}`)
      .pipe(catchError(this.handleErrors)) 
  }

  private handleErrors(response: any) {
    return  throwError(response.error || 'HttpError ' + response.status);
  }
}
