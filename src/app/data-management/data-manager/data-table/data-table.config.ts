export const DataTableConfig = {
    ignoredProperties: {updatedAt: true, createdAt: true, lastVisited: true, employerId: true, missionTypeId: true, fileName: true}, 

    noEditProperties: {id: true, missionType: true, employer: true, password: true},
    
    booleanProperties: {finished: true},
    
    objectProperties: {missionType: true, employer: true},
}