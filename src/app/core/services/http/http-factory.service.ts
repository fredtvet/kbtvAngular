import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({providedIn: "root"})
export class HttpFactoryService {
    constructor(private apiService: ApiService) {}

    getObserver$(command: { method: "POST" | "PUT" | "DELETE"; apiUrl: string; body: any; }): Observable<any> {
        switch (command.method) {
          case "POST": return this.apiService.post(command.apiUrl, command.body);
          case "PUT": return this.apiService.put(command.apiUrl, command.body);
          case "DELETE": return this.apiService.delete(command.apiUrl);
        }
    }
}