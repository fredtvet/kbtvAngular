import { Injectable } from '@angular/core';
import { MissionReportType  } from 'src/app/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MissionReportTypesSubject {

  private missionReportTypesSubject =
          new BehaviorSubject<MissionReportType[]>([]);

  public missionReportTypes$ = this.missionReportTypesSubject.asObservable();

  constructor() {}

  populate(missionReportTypes: MissionReportType[]){
    this.missionReportTypesSubject.next(missionReportTypes);
  }

  get$(id: number): Observable<MissionReportType>{
    return this.missionReportTypes$.pipe(map(arr => arr.find(e => e.id == id)));
  }

  add(missionReportType: MissionReportType){
    if(!this.missionReportTypesSubject.value.find(e => e.id == missionReportType.id)) //Only add if ID doesnt exist
      this.missionReportTypesSubject.value.push(missionReportType);
  }

  update(missionReportType: MissionReportType){
    this.missionReportTypesSubject.next(
      this.missionReportTypesSubject.value.map(e => {
        if(e.id !== missionReportType.id) return e;
        else return missionReportType;
      })
    );
  }

  delete(id: number){
    this.missionReportTypesSubject.next(
      this.missionReportTypesSubject.value.filter(d => {
        return d.id !== id
      })
    );
  }

  isEmpty(): boolean{
    return (this.missionReportTypesSubject.value === undefined || this.missionReportTypesSubject.value.length == 0)
  }
}
