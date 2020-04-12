import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MissionService, BaseService, MissionTypeService, ReportTypeService, EmployerService, TranslationService, SessionService } from 'src/app/core/services';
import { Subscription } from 'rxjs';
import { MainNavConfig } from 'src/app/shared/layout';
import { AgGridAngular } from 'ag-grid-angular';
import { ConfirmDeleteDialogComponent, MissionTypeFormDialogComponent, ReportTypeFormDialogComponent } from 'src/app/shared/components';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { BaseEntity } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.scss'],
  encapsulation : ViewEncapsulation.None,
})

export class DataManagerComponent {
@ViewChild('dataGrid', {static: false}) dataGrid: AgGridAngular;

mainNavConfig = new MainNavConfig();

dataSub$ = new Subscription();

columnDefs: any = [];

rowData: any = [];

tables = ['Oppdrag', 'Oppdragstyper', 'Oppdragsgivere', 'Rapporttyper']

ignoredProperties = ['id', 'updatedat', 'createdat', 'employerid', 'missiontypeid'];

noEditProperties = ['missiontype', 'employer'];

booleanProperties = ['finished']

objectProperties = ['missiontype', 'employer'];

constructor(
  public sessionService: SessionService,
  private translationService: TranslationService,
  private employerService: EmployerService,
  private missionTypeService: MissionTypeService,
  private missionService: MissionService,
  private reportTypeService: ReportTypeService,
  private router: Router,
  private dialog: MatDialog) {
  }

  ngOnInit(){
    this.loadTable();
  }

  initNgGrid(data: BaseEntity[]){
    this.columnDefs = [];
    this.rowData = [];

    if(data.length == 0) return null;

    this.columnDefs.push({colId: 'checkbox', checkboxSelection: true, width: 42, pinned: 'left', lockPosition: true})
    //Add cols for properties
    Object.getOwnPropertyNames(data[0])
      .forEach(name => this.addColumnDef(name));

    this.rowData = data;
  }


  loadTable(){
    if(this.sessionService.dataTable != undefined){
      this.dataSub$.unsubscribe();
      this.dataSub$ = this.getCurrentService().getAllDetails$().subscribe(x => this.initNgGrid(x))
    }
  }

  autoSizeGrid(){
    let cols = this.dataGrid.columnApi.getAllColumns().filter(x => x.getColId() != 'checkbox')
    this.dataGrid.columnApi.autoSizeColumns(cols);
  }

  create() {
    switch(this.sessionService.dataTable){
      case "Oppdrag": this.createMission(); break;
      case "Oppdragstyper": this.createMissionType(); break;
      case "Oppdragsgivere": this.createEmployer(); break;
      case "Rapporttyper": this.createReportType(); break;
    }
  }

  editCell(e: any){
    if(e.oldValue != e.newValue)
      this.getCurrentService().update$(e.data).subscribe(x => {}, error => {
        e.node.setDataValue(e.column.colId, e.oldValue) //Reset value on error
      });
    this.autoSizeGrid();
  }

  openDeleteDialog = () => {
    if(this.dataGrid.api.getSelectedNodes().length == 0) return null;

    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(res => {
        if(res) this.deleteSelectedCells();
    });
  }

  private deleteSelectedCells(): boolean{
    const ids = this.dataGrid.api.getSelectedNodes().map(node => node.data['id']);
    if(ids.length == 0) return false;
    this.getCurrentService().deleteRange$(ids).subscribe();
  }

  private addRow(data: BaseEntity){ //Manually adding as data binding did not work
    this.dataGrid.api.updateRowData({add: [data]})
  }

  private addColumnDef(name: string){

    let nameLower = name.toLowerCase();

    if(this.ignoredProperties.includes(nameLower)) return false; //Ignored properties

    let def = {
      field: name,
      headerName: this.translationService.translateProperty(nameLower),
      sortable: true,
      resizable: true,
      editable: true,
      lockPosition: true
    };

    if(this.booleanProperties.includes(nameLower)){

      def['cellEditor'] = 'agSelectCellEditor';
      def['cellEditorParams'] = { values: ['Ja', 'Nei']}

      def['valueGetter'] = function(params){return params.data[name] == true ? 'Ja' : 'Nei'}

      def['valueSetter'] = function(params){

        let val = params.newValue.toLowerCase();
        if(val == 'ja') params.data[name] = true;
        else if (val == 'nei') params.data[name] = false;
        else return false;

        return true;
      }
    }

    if(this.noEditProperties.includes(nameLower)) def['editable'] = false;

    if(this.objectProperties.includes(nameLower)){

      def['valueGetter'] = function(params) { //Get name of object and display
        if(params.data[name] !== undefined)
          return params.data[name].name;
        else return ''
      };

    }

    this.columnDefs.push(def);
  }

  private getCurrentService(): BaseService<BaseEntity>{
    switch(this.sessionService.dataTable){
      case "Oppdrag": return this.missionService;
      case "Oppdragstyper": return this.missionTypeService;
      case "Oppdragsgivere": return this.employerService;
      case "Rapporttyper": return this.reportTypeService;
    }
  }

  private createMission = () => this.router.navigate(['/oppdrag/ny', {returnRoute: '/data'}])

  private createEmployer = () => this.router.navigate(['/oppdragsgivere/ny', {returnRoute: '/data'}])

  private createMissionType(){
    const createDialogRef = this.dialog.open(MissionTypeFormDialogComponent);
    createDialogRef.afterClosed().subscribe(data => {
      if(data == null) return null;
      this.getCurrentService().add$(data).subscribe(x => this.addRow(x));
    });
  }

  private createReportType(){
    const createDialogRef = this.dialog.open(ReportTypeFormDialogComponent);
    createDialogRef.afterClosed().subscribe(data => {
      if(data == null) return null;
      this.getCurrentService().add$(data).subscribe(x => this.addRow(x));
    });
  }

}


