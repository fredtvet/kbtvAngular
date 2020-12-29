import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { ModelState } from '@core/state/model-state.interface';
import { OptimisticStateSelector } from 'optimistic-http';
import { StateSyncTimestamp } from '@sync/interfaces';

type State = ModelState & StateSyncTimestamp & StateCurrentUser
export const AppOptimisticState: OptimisticStateSelector<State> = {
    strategy: "include",
    props: [
        "missions",
        "missionDocuments",
        "missionImages",
        "missionNotes", 
        "missionTypes", 
        "employers",
        "userTimesheets", 
        "documentTypes",
        "currentUser",
        "syncTimestamp",
    ]
}
