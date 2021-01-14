import { ModelState } from "@core/state/model-state.interface";
import { ModelDataTablesConfig } from "model-data-table";

export const ModelDataTables: ModelDataTablesConfig<Partial<ModelState>> = {
    baseColDef: {sortable: true, resizable: true, editable: true, lockPosition: true},
    tables: {
        missions: {selectable: true, propertyColDefs: {
            id: {}, 
            address: {}, 
            finished: {boolean: true}, 
            phoneNumber: {}, 
            missionTypeId: {}, 
            employerId: {}
        }},
        employers: {selectable: true, propertyColDefs: {
            id: {}, name: {}, phoneNumber: {}, address: {}, email: {}
        }},
        missionTypes: {selectable: true, propertyColDefs: {
            id: {}, name: {}
        }},
        documentTypes: {selectable: true, propertyColDefs: {
            id: {}, name: {} 
        }},
        inboundEmailPasswords: {selectable: true, propertyColDefs: {
            id: {}, password: {editable: false}
        }},
    }
}
