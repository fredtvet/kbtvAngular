import { Compiler, Injectable, Injector } from '@angular/core';
import { _tryWithLogging } from 'array-helpers';
import { AppNotification, NotificationService } from 'notification';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

/** Responsible for queueing and displaying notifications provided by user as a snack bar */
@Injectable({ providedIn: 'root' })
export class AppNotificationService {

  private serviceSubject = new BehaviorSubject<NotificationService | null>(null);

  private service$ = <Observable<NotificationService>> 
    this.serviceSubject.asObservable().pipe(filter(x => x !== null), first());
  
  private hasInitalizedLoading: boolean = false; 

  constructor(
    private compiler: Compiler,
    private injector: Injector
  ) { }

  notify = (notification: AppNotification) => { 
    if(this.hasInitalizedLoading === false) {
        this.hasInitalizedLoading = true;
        this.loadNotificationService();
    }  
    this.service$.subscribe(x => x.notify(notification))
  }

  private loadNotificationService(): void {
    import('notification').then(({NotificationService, NotificationModule}) => {
        const moduleFactory = this.compiler.compileModuleSync(NotificationModule); 
        const moduleInstance = moduleFactory.create(this.injector);
        this.serviceSubject.next(moduleInstance.injector.get(NotificationService));    
    })
  }

}
