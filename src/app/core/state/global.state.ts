import { Mission, Employer, MissionType, MissionImage, MissionDocument, MissionNote, AppDocumentType, Timesheet, User } from 'src/app/core/models';
import { SyncStoreConfig } from '../services/sync/interfaces/sync-store-config.interface';
import { AccessToken, TimesheetCriteria } from 'src/app/shared-app/interfaces';

//export type KeysEnum<T> = { [P in keyof Required<T>]: P };

export interface StateLastAction{ lastAction: string } 
export interface StateMissions { missions: Mission[] }  
export interface StateEmployers { employers: Employer[] }
export interface StateMissionTypes { missionTypes: MissionType[] }
export interface StateMissionImages { missionImages: MissionImage[] }
export interface StateMissionDocuments { missionDocuments: MissionDocument[] }
export interface StateMissionNotes { missionNotes: MissionNote[] }
export interface StateDocumentTypes { documentTypes: AppDocumentType[] }
export interface StateUserTimesheets { userTimesheets: Timesheet[] }
export interface StateTimesheetCriteria { timesheetCriteria: TimesheetCriteria }
export interface StateSyncConfig { syncConfig: SyncStoreConfig }
export interface StateCurrentUser { currentUser: User }
export interface StateUsers { users: User[] }
export interface StateInboundEmailPassword { inboundEmailPasswords: User[] }
export interface StateAccessToken { accessToken: AccessToken }
export interface StateRefreshToken { refreshToken: string }
export interface StateTimesheets { timesheets: Timesheet[] }

export interface ModelState extends
    StateMissions, StateEmployers, StateMissionTypes, StateMissionImages, StateMissionDocuments, StateMissionNotes, StateDocumentTypes,
    StateUserTimesheets, StateUsers, StateInboundEmailPassword, StateTimesheets {}