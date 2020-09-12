import { stateFunc } from '@codewithdan/observable-store/dist/observable-store';

export interface StateHttpCommand<TState>{
    apiUrl: string;
    httpMethod: "POST" | "PUT" | "DELETE";
    httpBody: any;
    stateFunc?: stateFunc<TState>;
}