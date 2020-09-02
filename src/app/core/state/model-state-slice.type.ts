import { ModelState } from './global.state';
import { Observable } from 'rxjs';

export type ModelStateSlice$ = (properties: (keyof Partial<ModelState>)[]) => Observable<Partial<ModelState>>