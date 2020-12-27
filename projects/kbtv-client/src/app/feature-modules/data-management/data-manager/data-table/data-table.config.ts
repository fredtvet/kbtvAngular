import { UnknownState } from "@global/interfaces";

export const DataTablePropConfig: {ignored:UnknownState, noEdit: UnknownState, boolean: UnknownState} = {
    ignored: {updatedAt: true, createdAt: true, lastVisited: true, employer: true, missionType: true, fileName: true}, 

    noEdit: {id: true, password: true},
    
    boolean: {finished: true},
}