import { Mission, Employer, MissionType, MissionImage, MissionDocument, MissionNote, Timesheet, User, InboundEmailPassword } from '@core/models';
import { Maybe } from 'global-types';
import { CurrentUser } from 'state-auth';

export interface StateMissions { missions: Maybe<Mission[]> }  
export interface StateEmployers { employers: Maybe<Employer[]> }
export interface StateMissionTypes { missionTypes: Maybe<MissionType[]> }
export interface StateMissionImages { missionImages: Maybe<MissionImage[]> }
export interface StateMissionDocuments { missionDocuments: Maybe<MissionDocument[]> }
export interface StateMissionNotes { missionNotes: Maybe<MissionNote[]> }
export interface StateUserTimesheets { userTimesheets: Maybe<UserTimesheet[]> }
export interface StateCurrentUser { currentUser: Maybe<User & CurrentUser> }
export interface StateUsers { users: Maybe<User[]> }
export interface StateInboundEmailPassword { inboundEmailPasswords: Maybe<InboundEmailPassword[]> }
export interface StateTimesheets { timesheets: Maybe<Timesheet[]> }

export interface UserTimesheet extends Omit<Timesheet, "user" | "userName" | "fullName"> { unqireas?: string }