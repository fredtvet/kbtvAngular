import { stateFunc } from '@codewithdan/observable-store/dist/observable-store';
import { Prop } from 'src/app/shared-app/prop.type';

export interface StateHttpCommand<TState>{
    apiUrl: string;
    httpMethod: "POST" | "PUT" | "DELETE";
    httpBody: any;
    stateFunc?: stateFunc<Partial<TState>>;
    properties?: Prop<TState>[];
    cancelMessage?: string;
}