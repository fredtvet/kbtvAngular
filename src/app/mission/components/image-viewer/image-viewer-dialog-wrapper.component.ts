import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { MissionImageService } from 'src/app/core/services';
import { AppImage, AppButton } from 'src/app/shared/interfaces';
import { Roles } from 'src/app/shared/enums';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { MissionImage } from 'src/app/shared/models';

@Component({
  selector: 'app-timesheet-card-dialog-wrapper',
  template: `
  <app-image-viewer
    [images]="data.images" 
    [currentImage]="data.currentImage"
    [actions]="actions"
    (imageDeleted)="deleteImage($event)"
    (currentImageChanged)="data.currentImage = $event"
    (close)="close()">
  </app-image-viewer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ImageViewerDialogWrapperComponent {

  actions: AppButton[];
  
  constructor( 
    private dialog: MatDialog,
    private missionImageService: MissionImageService,
    private dialogRef: MatDialogRef<ImageViewerDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {images: AppImage[], currentImage: MissionImage}
    ) {}
  
    ngOnInit(): void {
      this.actions = [
        {text: "Last ned bilde", icon: "cloud_download", callback: this.downloadImage},
        {text: "Last ned alle", icon: "cloud_download", callback: this.downloadImages},
        {text: "Slett bilde", icon: "delete", callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
      ];
    }

  deleteImage = (id: number) =>
    this.missionImageService.delete$(id)
      .subscribe(x => this.dialogRef.close());

  close = () => this.dialogRef.close();
  
  private openConfirmDeleteDialog = () => {
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette bildet.'});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteCurrentImage());
  }

  private deleteCurrentImage = () => {
    this.missionImageService.delete$(this.data.currentImage.id)
      .subscribe(x => this.dialogRef.close());
  }

  private downloadImage = () => {
    window.open(this.data.currentImage.fileURL)
  }

  private downloadImages = () => {
    this.data.images.forEach(x => {
      window.open(x.fileURL)
    });
  }

}
