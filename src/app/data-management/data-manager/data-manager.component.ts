import { Component, OnInit, ViewChild } from '@angular/core';
import { MissionService, BaseService, MissionTypeService, UsersService, ReportTypeService, EmployerService } from 'src/app/core';
import { trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { BaseEntity } from 'src/app/shared/models';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';
import { AgGridAngular } from 'ag-grid-angular';
import { ConfirmDeleteDialogComponent } from 'src/app/shared';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.scss']
})

export class DataManagerComponent {
@ViewChild('dataGrid', {static: false}) dataGrid: AgGridAngular;

mainNavConfig = new MainNavConfig();

columnDefs: any = [];

rowData: any = [];

tables = ['Oppdrag', 'Oppdragstyper', 'Oppdragsgivere', 'Rapporttyper']

currentTable: string;

tableSub$: Subscription = new Subscription();

constructor(
  private employerService: EmployerService,
  private missionTypeService: MissionTypeService,
  private missionService: MissionService,
  private reportTypeService: ReportTypeService,
  private dialog: MatDialog
  ) { this.mainNavConfig.deleteEnabled = true;
   }

  initNgGrid(data: BaseEntity[]){
    this.columnDefs = [];
    this.rowData = [];

    if(data.length == 0) return null;

    //Add checkbox col
    this.columnDefs.push({checkboxSelection: true, width: 42, pinned: 'left', lockPosition: true})
    //Add cols for properties
    Object.getOwnPropertyNames(data[0])
      .forEach(name => this.addColumnDef(name));

    this.rowData = data;
  }

  editCell(entity: BaseEntity){
    this.getCurrentService().update$(entity).subscribe();
  }

  openDeleteDialog = () => {
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(res => {
        if(res) this.deleteSelectedCells();
    });
  }

  deleteSelectedCells(): boolean{
    const ids = this.dataGrid.api.getSelectedNodes().map(node => node.data['id']);
    if(ids.length == 0) return false;
    this.getCurrentService().deleteRange$(ids).subscribe();
  }

  changeTable(){
    this.tableSub$.unsubscribe(); //Unsubscribe to previous
    this.tableSub$ = this.getCurrentService().getAll$().subscribe(x => this.initNgGrid(x))
  }

  private addColumnDef(name: string){
    let nameLower = name.toLowerCase();

    if(nameLower == "updatedat" || nameLower == "createdat" || nameLower == "employer" || nameLower == "missiontype") return false; //Ignored properties

    let def = {field: name , sortable: true, resizable: true, editable: true, lockPosition: true};

    if(nameLower == "id"){ //Id property
      def['resizable'] = false;
      def['width'] = 40;
    }

    if(nameLower.toLowerCase().includes("id") || nameLower == "finished"){ //Uneditable properties
      def['editable'] = false;
    }

    this.columnDefs.push(def);
  }


  private getCurrentService(): BaseService<BaseEntity>{
    switch(this.currentTable){
      case "Oppdrag": return this.missionService;
      case "Oppdragstyper": return this.missionTypeService;
      case "Oppdragsgivere": return this.employerService;
      case "Rapporttyper": return this.reportTypeService;
    }
  }

}


