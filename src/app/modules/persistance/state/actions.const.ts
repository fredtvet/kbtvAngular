import { StateAction } from '@state/state.action';

export class LoadPersistedStateAction extends StateAction {}

export class SetPersistedCriticalStateAction extends StateAction { 
    constructor(public state: any){ super() } 
}

export class SetPersistedStateAction extends StateAction { 
    constructor(public state: any){ super() } 
}