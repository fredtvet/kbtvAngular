import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Timesheet } from "@core/models";
import { UnknownState } from "global-types";
import { TimesheetSummary } from '@shared-timesheet/interfaces';
import { TimesheetStatus } from "@shared/enums";
import { translations } from "@shared/translations";
import { ColDef, ValueFormatterParams } from "ag-grid-community";

@Injectable()
export class ColDefsFactoryService {

  private summaryColDefs: ColDef[];
  private timesheetColDefs: ColDef[];

  constructor(private datePipe: DatePipe) {
    this.summaryColDefs = [
      { field: "date", valueFormatter: this.convertDate },
      { field: "year" },
      { field: "month", valueFormatter: this.convertMonthIndex },
      { field: "weekNr" },
      { field: "fullName" },
      { field: "openHours" },
      { field: "confirmedHours" },
    ];

    this.timesheetColDefs = [
      { field: "startTime", headerName: translations["date"], valueFormatter: this.convertDate},
      { field: "fullName" },
      { field: "totalHours", maxWidth: 75 },
      { field: "startTime", valueFormatter: this.convertTime },
      { field: "endTime", valueFormatter: this.convertTime },
      { field: "status", valueFormatter: this.convertStatus },
      { field: "missionId" },
      { field: "comment", maxWidth: 200 },
    ];
  }

  createColDefs(entity: TimesheetSummary | Timesheet): ColDef[]  {
    const isSummary = ((<TimesheetSummary> entity).confirmedHours || (<TimesheetSummary> entity).openHours) ? true : false;

    return this._createColDefs(entity, isSummary ? this.summaryColDefs : this.timesheetColDefs);
  }

  private _createColDefs(object: {}, colDefs: ColDef[]): ColDef[] {
    const result: ColDef[] = [];
    for (const colDef of colDefs) {
      if (colDef?.field && (<UnknownState>object)[colDef.field] != null)
        result.push(this.mergeDefaultColDef(colDef));
    }
    return result;
  }

  private mergeDefaultColDef(colDef: ColDef): ColDef {
    const genericColDef = {
      headerName: colDef.field ? translations[colDef.field.toLowerCase()] : "",
      sortable: true,
    };
    return { ...genericColDef, ...colDef };
  }

  private convertMonthIndex = (params: ValueFormatterParams): string =>
    params?.value != null
      ? (this.datePipe.transform(new Date().setMonth(params.value), "MMM") || "")
      : "";

  private convertDate = (params: ValueFormatterParams): string =>
    params?.value 
      ? (this.datePipe.transform(params.value) || "")
      : "";

  private convertTime = (params: ValueFormatterParams): string =>
    params?.value
      ? (this.datePipe.transform(params.value, "shortTime") || "")
      : "";

  private convertStatus = (params: ValueFormatterParams): string => 
    translations[TimesheetStatus[params.value]?.toLowerCase()]
}
