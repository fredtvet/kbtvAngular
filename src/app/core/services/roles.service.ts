import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ROLES } from 'src/app/shared/roles.enum';

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  uri : String = "/Roles";

  private rolesSubject =
          new BehaviorSubject<string[]>([]);

  private roles$ = this.rolesSubject.asObservable().pipe(map(x => x.filter(r => r !== ROLES.Leder)));

  constructor(private apiService: ApiService) {}

  getAll$(): Observable<string[]> {
    if(this.rolesSubject.value === undefined || this.rolesSubject.value === null || this.rolesSubject.value.length == 0){ //Not in memory
      let localRoles = this._getRolesFromLocal();
      if(localRoles === undefined || localRoles === null || localRoles.length == 0){ //Not in local
        return this.apiService.get(`${this.uri}`) //Fetch from api
        .pipe(switchMap(data => {
          this.rolesSubject.next(data); //Save to memory
          this._saveToLocal(data); //Save to local
          return this.roles$;
        }));
      }
      else this.rolesSubject.next(localRoles);
    }

    return this.roles$;
  }

  private _saveToLocal(roles: string[]){
    window.localStorage.setItem('roles', JSON.stringify(roles))
  }

  private _getRolesFromLocal(): string[]{
    return JSON.parse(window.localStorage.getItem('roles'));
  }

}
