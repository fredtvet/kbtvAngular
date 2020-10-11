import { Observable } from 'rxjs';

export interface OnStateDelete { delete: (id: any) => void }
export interface OnStateDeleteRange { deleteRange: (ids: any) => void }
export interface OnStateUpdate { update: (command: Object) => void  }
export interface OnStateAdd { add: (command: Object) => void  }
export interface OnStateMail { mail: (toEmail: string, command: any) => void };
export interface OnGetWithRelations { getWithRelations$: <T>(id: any) => Observable<T> }
export interface OnGetWithByRelations { getByWithRelations$: <T>(filter?: (value: T, index?: number, Array?: T[]) => boolean) => Observable<T[]> }