import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { Timesheet } from "src/app/core/models";
import { TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { TimesheetStatus } from "src/app/shared/enums";
import { translations } from "src/app/shared/translations";

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
    const isSummary = (entity['confirmedHours'] || entity['openHours']) ? true : false;

    return this._createColDefs(entity, isSummary ? this.summaryColDefs : this.timesheetColDefs);
  }

  private _createColDefs(object: Object, colDefs: ColDef[]): ColDef[] {
    const result: ColDef[] = [];
    for (const colDef of colDefs) {
      if (object[colDef.field] != null)
        result.push(this.mergeDefaultColDef(colDef));
    }
    return result;
  }

  private mergeDefaultColDef(colDef: ColDef): ColDef {
    const genericColDef = {
      headerName: translations[colDef.field.toLowerCase()],
      sortable: true,
    };
    return { ...genericColDef, ...colDef };
  }

  private convertMonthIndex = (params) =>
    params?.value != null
      ? this.datePipe.transform(new Date().setMonth(params.value), "MMM")
      : undefined;

  private convertDate = (params) =>
    params?.value ? this.datePipe.transform(params.value) : undefined;

  private convertTime = (params) =>
    params?.value
      ? this.datePipe.transform(params.value, "shortTime")
      : undefined;

  private convertStatus = (params) => {
    if (params?.value === TimesheetStatus.Open) return "Åpen";
    if (params?.value === TimesheetStatus.Confirmed) return "Låst";
  };
}
