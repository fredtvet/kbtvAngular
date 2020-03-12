import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { RolesSubject } from '../../subjects/roles.subject';

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  private uri : String = "/Roles";

  constructor(
    private apiService: ApiService,
    private rolesSubject: RolesSubject) {
      this.populateIfEmpty();
    }

  getAll$(): Observable<string[]> {
    return this.rolesSubject.getAll$();
  }

  private populateIfEmpty(){
    this.rolesSubject.getAll$().pipe(take(1)).subscribe(data => {
      if(data.length == 0)
        this.apiService.get(`${this.uri}`) //Fetch from api
        .subscribe(data => this.rolesSubject.populate(data));
    })
  }
}
