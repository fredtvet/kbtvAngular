import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ROLES, Mission, MissionNote, MissionImage, MissionReport, ConfirmDeleteDialogComponent } from 'src/app/shared';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mission-details-view',
  templateUrl: './mission-details-view.component.html',
  styleUrls: ['./mission-details-view.component.scss']
})
export class MissionDetailsViewComponent {

  public ROLES = ROLES;

  @Input() mission: Mission = new Mission();
  @Input() images: MissionImage[] = [];
  @Input() notes: MissionNote[] = [];
  @Input() reports: MissionReport[] = [];

  @Output() imagesUploaded = new EventEmitter();
  @Output() imageDeleted = new EventEmitter();
  @Output() noteEdit = new EventEmitter();
  @Output() noteDeleted = new EventEmitter();
  @Output() reportDeleted = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnChanges(): void {
    console.log(this.reports)
  }

  openDeleteReportDialog(id: number){
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(confirmed => {if(confirmed)this.reportDeleted.emit(id)});
  }

}
