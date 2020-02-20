import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, skip, tap } from 'rxjs/operators';
import { ROLES } from 'src/app/shared/roles.enum';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  private uri : String = "/Roles";
  private storageKey = "roles";

  private rolesSubject =
          new BehaviorSubject<string[]>([]);

  private roles$ = this.rolesSubject.asObservable().pipe(map(x => x.filter(r => r !== ROLES.Leder)), tap(console.log));

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService) {

        let localRoles = this.localStorageService.get(this.storageKey);
        console.log(localRoles);

        if(localRoles === undefined || localRoles === null || localRoles.length == 0){ //Not in local

          this.apiService.get(`${this.uri}`) //Fetch from api
          .subscribe(data => {
            this.rolesSubject.next(data); //Save to memory
            return this.roles$;
          });

        }
        else this.rolesSubject.next(localRoles);

        this.roles$.pipe(skip(1)).subscribe(data => {
          this.localStorageService.add(this.storageKey, data);
        });

    }

  getAll$(): Observable<string[]> {
    return this.roles$;
  }

}
