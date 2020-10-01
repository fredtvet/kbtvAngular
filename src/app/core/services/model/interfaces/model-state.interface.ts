import { StateMissions, StateEmployers, StateMissionTypes, StateMissionImages, StateMissionDocuments, 
    StateMissionNotes, StateDocumentTypes, StateUserTimesheets, StateUsers, 
    StateInboundEmailPassword, StateTimesheets } from '../../state/interfaces';

export interface ModelState extends
    StateMissions, StateEmployers, StateMissionTypes, StateMissionImages, StateMissionDocuments, StateMissionNotes, StateDocumentTypes,
    StateUserTimesheets, StateUsers, StateInboundEmailPassword, StateTimesheets {
}


