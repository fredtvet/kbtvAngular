import { Observable } from 'rxjs';
import { StateCommand } from '../state-http-converter';

export interface OnStateDelete { delete: (id: any) => void }
export interface OnStateDeleteRange { deleteRange: (ids: any) => void }
export interface OnStateUpdate { update: (command: Object) => void  }
export interface OnStateAdd { add: (command: Object) => void  }
export interface OnStateSave { save: <T extends StateCommand>(command: T) => void  }
export interface OnGetWithRelations { getWithRelations$: <T>(id: any) => Observable<T> }
export interface OnGetWithByRelations { getByWithRelations$: <T>(filter?: (value: T, index?: number, Array?: T[]) => boolean) => Observable<T[]> }