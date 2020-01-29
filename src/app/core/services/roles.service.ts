import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
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

  getRoles() {
    if(this.rolesSubject.value === undefined || this.rolesSubject.value.length == 0){
      return this.apiService.get(`${this.uri}`)
        .pipe(switchMap(data => {
          this.rolesSubject.next(data);
          return this.roles$;
        }));
    }
    else return this.roles$;
  }

}
