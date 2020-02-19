import { BaseEntity } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { map, tap, retry } from 'rxjs/operators';
import { BaseSubject } from '../../subjects/base.subject';
import { ApiService } from '../api.service';
import { ConnectionService } from '../connection.service';
import { LocalStorageService } from '../local-storage.service';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

export abstract class BaseService<T extends BaseEntity>{

  protected httpGetAllLoaded: boolean = false;
  protected httpGetLoaded: boolean = false;
  protected isOnline: boolean = false;

  constructor(
    protected apiService: ApiService,
    protected dataSubject: BaseSubject<T>,
    protected connectionService: ConnectionService,
    private localStorageService: LocalStorageService,
    protected readonly uri:string
    ) {
      this.connectionService.isOnline$.subscribe(res =>this.isOnline = res)
    }

  dbSync(): Observable<boolean>{
    if(!this.isOnline) return null;
    let fromDate = this.dataSubject.getTimestamp();

    return this.apiService
      .post(`${this.uri}/Sync`,{ FromDate: fromDate })
      .pipe(retry(3), tap(data => {
        this.dataSubject.sync(data);
      }))
  }

  getAll$(): Observable<T[]> {
    return this.dataSubject.data$;
  }

  get$(id: number):Observable<T>{
    return this.dataSubject.get$(id);
  }

  add$(entity: T): Observable<T>{

    if(!this.isOnline) return null;

    return this.apiService
                .post(`${this.uri}`, entity)
                .pipe(map(data =>{
                  console.log(data);
                  this.dataSubject.addOrReplace(data);
                  return data;
                }));
  }

  update$(entity: T): Observable<T>{

    if(!this.isOnline) return null;

    return this.apiService.put(`${this.uri}/${entity.id}`, entity)
      .pipe(map(data => {
        this.dataSubject.update(data);
        return data;
      }));
  }

  delete$(id: number): Observable<boolean> {

    if(!this.isOnline) return null;

    return this
            .apiService
            .delete(`${this.uri}/${id}`)
            .pipe(tap(bool =>{
              if(bool) this.dataSubject.delete(id);
            }));
  }

  refreshLocal(): void{
    this.dataSubject.purge();
    this.dbSync();
  }

}
