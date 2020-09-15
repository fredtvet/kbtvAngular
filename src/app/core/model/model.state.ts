import { StateMissions, StateEmployers, StateMissionTypes, StateMissionImages, StateMissionDocuments, StateMissionNotes, StateDocumentTypes, StateUserTimesheets, StateUsers, StateInboundEmailPassword, StateTimesheets } from '../state';
import { Model, Mission } from '../models';

export interface ModelStateProperty{ 
    [key:string]: Model[];
}

export interface ModelState extends ModelStateProperty,
    StateMissions, StateEmployers, StateMissionTypes, StateMissionImages, StateMissionDocuments, StateMissionNotes, StateDocumentTypes,
    StateUserTimesheets, StateUsers, StateInboundEmailPassword, StateTimesheets {
        missions: Mission[]
    }


