import { BaseEntity, Employer} from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BaseSubject } from '../../subjects/base.subject';
import { ApiService } from '../api.service';
import { ConnectionService } from '../connection.service';

export abstract class BaseService<T extends BaseEntity>{
  public uri: string;
  private httpLoaded: boolean = false;
  private isOnline: boolean = false;

  constructor(
    protected apiService: ApiService,
    protected dataSubject: BaseSubject<T>,
    protected connectionService: ConnectionService,
    ) {
      this.connectionService.isOnline$.subscribe(res =>this.isOnline = res)
    }

  getAll$(): Observable<T[]> {
    return this.dataSubject.data$.pipe(tap(data =>{
      if(!this.httpLoaded && this.isOnline){
        this.apiService.get(`${this.uri}`)
        .subscribe(data => {
          this.httpLoaded = true;
          this.dataSubject.populate(data);
        });
      }
    }));
  }

  get$(id: number):Observable<T>{
    return this.dataSubject.get$(id).pipe(tap(data => {
      if(data === undefined && this.isOnline){
        this.apiService.get(`${this.uri}/${id}`)
        .subscribe(data => this.dataSubject.addOrUpdate(data));
      }
    }));
  }

  add$(entity: T): Observable<T>{

    if(!this.isOnline) return null;

    return this.apiService
                .post(`${this.uri}`, entity)
                .pipe(map(data =>{
                  this.dataSubject.addOrUpdate(data);
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

}
