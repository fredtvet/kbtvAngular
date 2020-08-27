import { Observable } from 'rxjs';

export interface OnStateDelete { delete$: (id: any) => Observable<void> }
export interface OnStateUpdate { update$: (command: Object) => Observable<void>  }
export interface OnStateAdd { add$: (command: Object) => Observable<void>  }