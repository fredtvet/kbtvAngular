import { OnDestroy } from '@angular/core';
import { Constructor } from '@angular/material/core/common-behaviors/constructor';
import { Subject } from 'rxjs';

export function WithUnsubscribe<T extends Constructor<{}>>(Base: T = (class {} as any)) {
    return class extends Base implements OnDestroy {

        unsubscribe : Subject<void> = new Subject();

        ngOnDestroy(){
          this.unsubscribe.next();
          this.unsubscribe.complete();
        }

    }
}