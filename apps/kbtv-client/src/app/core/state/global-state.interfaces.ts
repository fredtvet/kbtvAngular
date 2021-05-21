import { Mission, Employer, MissionType, MissionImage, MissionDocument, MissionNote, Timesheet, User, InboundEmailPassword, UserTimesheet } from '@core/models';
import { LeaderSettings } from '@core/models/leader-settings.interface';
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
export interface StateLeaderSettings { leaderSettings: Maybe<LeaderSettings> }