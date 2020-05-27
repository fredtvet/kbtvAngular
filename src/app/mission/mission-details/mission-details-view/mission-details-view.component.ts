import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { Mission, MissionNote, MissionImage, MissionReport } from 'src/app/shared/models';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from 'src/app/shared/enums';
import { filter } from 'rxjs/operators';
import { MailImageSheetComponent } from '../../components/mail-image-form/mail-image-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-mission-details-view',
  templateUrl: './mission-details-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDetailsViewComponent {

  public Roles = Roles;

  @Input() mission: Mission;
  @Input() images: MissionImage[];
  @Input() notes: MissionNote[];
  @Input() reports: MissionReport[];

  @Output() imagesUploaded = new EventEmitter();
  @Output() imageDeleted = new EventEmitter();
  @Output() noteEdited = new EventEmitter();
  @Output() noteDeleted = new EventEmitter();
  @Output() reportDeleted = new EventEmitter();

  selectedImageIds: number[] = [];

  constructor(public dialog: MatDialog) { }

  openDeleteReportDialog(id: number){
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette rapporten.'});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.reportDeleted.emit(id));
  }

  selectImages = (ids: number[]) => {
    this.selectedImageIds = ids;
    console.log(this.selectedImageIds);
  }

  uploadImages = (files: FileList, missionId: number) => this.imagesUploaded.emit({files, missionId});
  
  deleteImage = (id: number) => this.imageDeleted.emit(id);
  deleteNote = (id: number) => this.noteDeleted.emit(id);
  deleteReport = (id: number) => this.reportDeleted.emit(id);

}
