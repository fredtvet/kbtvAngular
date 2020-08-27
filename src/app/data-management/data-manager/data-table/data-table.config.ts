export const DataTableConfig = {
    ignoredProperties: ['updatedat', 'createdat', 'lastvisited', 'employerid', 'missiontypeid', 'imageurl'],  
    
    noEditProperties: ['id', 'missiontype', 'employer', 'password'],
    
    booleanProperties: ['finished'],
    
    objectProperties: ['missiontype', 'employer'],
}