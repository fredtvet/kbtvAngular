import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class SubscriptionComponent implements OnDestroy {

  protected unsubscribe : Subject<void> = new Subject();

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
