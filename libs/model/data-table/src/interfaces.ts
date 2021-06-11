import { ColDef } from "ag-grid-community";
import { Immutable } from "global-types";
import { StateAction } from "state-management";

/** Represents a configuration object for all model data tables.
 *  Provided with token {@link MODEL_DATA_TABLES_CONFIG} */
export interface ModelDataTablesConfig<TState> {
    /** Base column definition used on all columns */
    baseColDef: ColDef;
    /** The table definitions for each model in state */
    tables: {[key in keyof TState]: ModelDataTable<unknown>}
}

/** Defines a table used to render a AgGridTable for a given state model. */
export interface ModelDataTable<TModel> {
    /** If set to true, a checkbox column is rendered for selection. 
     *  @remarks Set rowSelection to "multiple" on AgGridTable for multi selection */
    selectable?: boolean
    /** Definitions used to render a column for a property on the model. */
    propertyColDefs: {[key in keyof TModel]: ModelPropertyColDef<TModel> };
    /** A custom function used to convert the results of an update to a state action. 
     *  By default the SaveModelAction is used. */
    onUpdateActionConverter?: (t: TModel) => StateAction;
}

/** Defines a column for a property on a state model */
export interface ModelPropertyColDef<TModel>  {
    valueGetter?: (model: Immutable<TModel>) => unknown;
    /** Set to true if the property represents a boolean value. The column will render a select with "ja" or "nei" */
    boolean?: boolean;
    /** Set to true if the property should be editable */
    editable?: boolean;
}