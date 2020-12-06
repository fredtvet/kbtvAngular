import { OptimisticStateSelector } from 'src/app/core/services/http/interfaces';

export const AppOptimisticState: OptimisticStateSelector<any> = {
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
        "syncTimestamps",
    ]
}
