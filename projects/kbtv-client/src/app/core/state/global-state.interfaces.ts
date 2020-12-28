import { Mission, Employer, MissionType, MissionImage, MissionDocument, MissionNote, AppDocumentType, Timesheet, User } from '@core/models';
import { Maybe } from 'global-types';

export interface StateMissions { missions: Maybe<Mission[]> }  
export interface StateEmployers { employers: Maybe<Employer[]> }
export interface StateMissionTypes { missionTypes: Maybe<MissionType[]> }
export interface StateMissionImages { missionImages: Maybe<MissionImage[]> }
export interface StateMissionDocuments { missionDocuments: Maybe<MissionDocument[]> }
export interface StateMissionNotes { missionNotes: Maybe<MissionNote[]> }
export interface StateDocumentTypes { documentTypes: Maybe<AppDocumentType[]> }
export interface StateUserTimesheets { userTimesheets: Maybe<Timesheet[]> }
export interface StateCurrentUser { currentUser:Maybe <User> }
export interface StateUsers { users: Maybe<User[]> }
export interface StateInboundEmailPassword { inboundEmailPasswords: Maybe<User[]> }
export interface StateTimesheets { timesheets: Maybe<Timesheet[]> }