import { Prop } from 'global-types';
import { StateSyncTimestamp } from 'state-sync';
import { StateCurrentUser } from '../../state/global-state.interfaces';
import { ModelState } from '../../state/model-state.interface';

type State = ModelState & StateSyncTimestamp & StateCurrentUser
export const AppOptimisticStateProps: Prop<State>[] =  [
    "missions",
    "missionDocuments",
    "missionImages",
    "missionNotes", 
    "missionTypes", 
    "timesheets",
    "users",
    "employers",
    "userTimesheets", 
    "currentUser",
    "syncTimestamp",
]