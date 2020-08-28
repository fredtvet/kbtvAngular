export const DataTableConfig = {
    ignoredProperties: {updatedat: true, createdat: true, lastvisited: true, employerid: true, missiontypeid: true, imageurl: true}, 

    noEditProperties: {id: true, missiontype: true, employer: true, password: true},
    
    booleanProperties: {finished: true},
    
    objectProperties: {missiontype: true, employer: true},
}