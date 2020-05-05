import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { Mission, MissionNote, MissionImage, MissionReport } from 'src/app/shared/models';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from 'src/app/shared/enums';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-mission-details-view',
  templateUrl: './mission-details-view.component.html'
})
export class MissionDetailsViewComponent {

  public Roles = Roles;

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

  openDeleteReportDialog(id: number){
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette rapporten.'});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.reportDeleted.emit(id));
  }

}
