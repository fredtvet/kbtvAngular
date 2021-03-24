import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ApiService {

  constructor(private http: HttpClient) {}

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${path}`, { params })
      .pipe(catchError(x => this.handleErrors(x)));
  }

  put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>( `${environment.apiUrl}${path}`, body)
      .pipe(catchError(this.handleErrors))
    
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${path}`, body)
      .pipe(catchError(x => this.handleErrors(x)))
    
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}${path}`)
      .pipe(catchError(this.handleErrors)) 
  }

  private handleErrors(response: HttpErrorResponse) {
    return  throwError(response.error || 'HttpError ' + response.status);
  }
}
