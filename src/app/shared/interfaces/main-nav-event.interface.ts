import { MainNavEventTypes } from '../enums/main-nav-event-types.enum';

export interface MainNavEvent{
    type: MainNavEventTypes;        
    payload?: any;
}   