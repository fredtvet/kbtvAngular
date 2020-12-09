import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { BASE_API_URL } from './injection-tokens.const';

@Injectable({providedIn: "root"})
export class HttpFactoryService {
  
    constructor(
      private httpClient: HttpClient,
      @Inject(BASE_API_URL) private baseUrl: string
    ) {}

    getObserver$(command: { method: "POST" | "PUT" | "DELETE"; apiUrl: string; body: any; }): Observable<any> {
        switch (command.method) {
          case "POST": return this.httpClient.post(this.baseUrl + command.apiUrl, command.body);
          case "PUT": return this.httpClient.put(this.baseUrl +command.apiUrl, command.body);
          case "DELETE": return this.httpClient.delete(this.baseUrl + command.apiUrl);
        }
    }
}