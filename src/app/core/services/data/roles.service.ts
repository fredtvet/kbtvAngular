import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, skip, tap, take } from 'rxjs/operators';
import { ROLES } from 'src/app/shared/roles.enum';
import { LocalStorageService } from '../local-storage.service';
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
      console.log(data);
      if(data.length == 0)
        this.apiService.get(`${this.uri}`) //Fetch from api
        .subscribe(data => this.rolesSubject.populate(data));
    })
  }
}
