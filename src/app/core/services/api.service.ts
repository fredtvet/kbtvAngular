import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  private handleErrors(response: any) {
    console.log(response);
    return  throwError(response.error || 'HttpError ' + response.status);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    this.loadingService.setLoading(true)
    return this.http.get(`${environment.apiUrl}${path}`, { params })
      .pipe(
        tap(x => this.loadingService.setLoading(false)),
        catchError(x => this.handleErrors(x))
      );
  }

  put(path: string, body: Object = {}): Observable<any> {
    this.loadingService.setLoading(true)
    return this.http.put( `${environment.apiUrl}${path}`, body)
      .pipe(
        tap(x => this.loadingService.setLoading(false)),
        catchError(this.handleErrors)
      );
  }

  post(path: string, body: any): Observable<any> {
    this.loadingService.setLoading(true)
    return this.http.post(`${environment.apiUrl}${path}`, body)
      .pipe(
        tap(x => this.loadingService.setLoading(false)),
        catchError(x => this.handleErrors(x))
      );
  }

  delete(path: string): Observable<any> {
    this.loadingService.setLoading(true)
    return this.http.delete( `${environment.apiUrl}${path}` )
      .pipe(
        tap(x => this.loadingService.setLoading(false)),
        catchError(this.handleErrors)
      );
  }
}
