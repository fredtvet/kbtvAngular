import { Injectable } from '@angular/core';
import { MissionType  } from 'src/app/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MissionTypesSubject {

  private missionTypesSubject =
          new BehaviorSubject<MissionType[]>([]);

  public missionTypes$ = this.missionTypesSubject.asObservable();

  constructor() {}

  populate(missionTypes: MissionType[]){
    this.missionTypesSubject.next(missionTypes);
  }

  get$(id: number): Observable<MissionType>{
    return this.missionTypes$.pipe(map(arr => arr.find(e => e.id == id)));
  }

  add(missionType: MissionType){
    if(!this.missionTypesSubject.value.find(e => e.id == missionType.id)) //Only add if ID doesnt exist
      this.missionTypesSubject.value.push(missionType);
  }

  update(missionType: MissionType){
    this.missionTypesSubject.next(
      this.missionTypesSubject.value.map(e => {
        if(e.id !== missionType.id) return e;
        else return missionType;
      })
    );
  }

  delete(id: number){
    this.missionTypesSubject.next(
      this.missionTypesSubject.value.filter(d => {
        return d.id !== id
      })
    );
  }

  isEmpty(): boolean{
    return (this.missionTypesSubject.value === undefined || this.missionTypesSubject.value.length == 0)
  }
}
