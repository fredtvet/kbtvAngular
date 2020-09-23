import { StateMissions, StateEmployers, StateMissionTypes, StateMissionImages, StateMissionDocuments, StateMissionNotes, StateDocumentTypes, StateUserTimesheets, StateUsers, StateInboundEmailPassword, StateTimesheets } from '../state';
import { Model } from '../models';

export interface ModelStateProperty{ 
    [key:string]: Model[];
}

export interface ModelState extends
    StateMissions, StateEmployers, StateMissionTypes, StateMissionImages, StateMissionDocuments, StateMissionNotes, StateDocumentTypes,
    StateUserTimesheets, StateUsers, StateInboundEmailPassword, StateTimesheets {
    }


