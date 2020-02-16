import { BaseEntity } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseSubject } from '../../subjects/base.subject';
import { ApiService } from '../api.service';
import { ConnectionService } from '../connection.service';

export abstract class BaseService<T extends BaseEntity>{
  public uri: string;
  protected httpGetAllLoaded: boolean = false;
  protected httpGetLoaded: boolean = false;
  protected isOnline: boolean = false;

  constructor(
    protected apiService: ApiService,
    protected dataSubject: BaseSubject<T>,
    protected connectionService: ConnectionService,
    ) {
      this.connectionService.isOnline$.subscribe(res =>this.isOnline = res)
    }

  getAll$(): Observable<T[]> {
    this.httpGetAllIfValid();
    return this.dataSubject.data$;
  }

  get$(id: number):Observable<T>{
    this.httpGetIfValid(id);
    return this.dataSubject.get$(id);
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

  refreshLocal(): void{
    this.dataSubject.populate([]);
    this.httpGetAllLoaded = false;
    this.httpGetLoaded = false;
    this.httpGetAllIfValid();
  }


  private httpGetIfValid(id: number){
    if(!this.httpGetAllLoaded && !this.httpGetLoaded && this.isOnline){
      this.httpGetLoaded = true;
      this.apiService.get(`${this.uri}/${id}`)
        .subscribe(data => {
          this.dataSubject.addOrUpdate(data);
        },
        error => {this.httpGetLoaded = false;});
    }
  }

  private httpGetAllIfValid(){
    if(!this.httpGetAllLoaded && this.isOnline){
      this.httpGetAllLoaded = true;
      this.apiService.get(`${this.uri}`)
        .subscribe(res => {
          this.dataSubject.populate(res);
        },
        error => {this.httpGetAllLoaded = false;});
    }
  }

}
