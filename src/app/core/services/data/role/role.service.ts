import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { RoleSubject } from './role.subject';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  private uri : String = "/Roles";

  constructor(
    private apiService: ApiService,
    private roleSubject: RoleSubject) {
      this.populateIfEmpty();
    }

  getAll$(): Observable<string[]> {
    return this.roleSubject.getAll$();
  }

  private populateIfEmpty(){
    this.roleSubject.getAll$().pipe(take(1)).subscribe(data => {
      if(!data || data.length == 0)
        this.apiService.get(`${this.uri}`) //Fetch from api
        .subscribe(data => this.roleSubject.populate(data));
    })
  }
}
