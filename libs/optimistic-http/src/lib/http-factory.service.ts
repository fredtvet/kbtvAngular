import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { Immutable, Maybe } from 'global-types';
import { Observable } from 'rxjs';
import { OPTIMISTIC_BASE_API_URL } from './constants/injection-tokens.const';
import { FormDataEntry, OptimisticHttpHeaders, OptimisticHttpRequest } from './interfaces';

@Injectable({providedIn: "root"})
export class HttpFactoryService {
  
    constructor(
      private httpClient: HttpClient,
      @Inject(OPTIMISTIC_BASE_API_URL) private baseUrl: string
    ) {}

    getObserver$(request: Immutable<OptimisticHttpRequest>): Observable<{isDuplicate?: boolean} | undefined> {
      const options: {headers: HttpHeaders} = { headers: new HttpHeaders(<OptimisticHttpHeaders> request.headers) }
      switch (request.method) {
        case "POST": return this.httpClient.post(this.baseUrl + request.apiUrl, this.createHttpBody(request.body), options);
        case "PUT": return this.httpClient.put(this.baseUrl +request.apiUrl, this.createHttpBody(request.body), options);
        case "DELETE": return this.httpClient.delete(this.baseUrl + request.apiUrl, options);
      }
    }

    private createHttpBody(body: Maybe<{}> | FormDataEntry[]) : Maybe<{}> | FormData {
      if(!Array.isArray(body)) return body; //Assume all arrays are FormDataEntry
      const formData = new FormData(); //Hydrate form data object

      for(const entry of body) {
        if(entry.value instanceof File) formData.append(entry.name, entry.value, entry.value.name);
        else formData.append(entry.name, entry.value);
      }

      return formData;   
    }
}