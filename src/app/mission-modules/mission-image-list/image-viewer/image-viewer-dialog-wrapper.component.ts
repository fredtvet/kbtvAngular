import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { DownloaderService } from 'src/app/core/services';
import { Roles } from 'src/app/shared-app/enums';
import { ConfirmDialogComponent, ConfirmDialogConfig } from 'src/app/shared/components';
import { MissionImageListStore } from '../mission-image-list.store';
import { AppFile } from 'src/app/core/models';

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

  get actions(){
    return [
      {text: "Last ned bilde", icon: "cloud_download", callback: this.downloadImage},
      {text: "Slett bilde", icon: "delete", callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
    ];
  }

  constructor( 
    private dialog: MatDialog,
    private downloaderService: DownloaderService,
    private store: MissionImageListStore,
    private dialogRef: MatDialogRef<ImageViewerDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {images: AppFile[], currentImage: AppFile}
    ) {}
  
    deleteImage = (id: number) =>
      this.store.delete$(id).subscribe(this.dialogRef.close);

    close = () => this.dialogRef.close();
    
    private deleteCurrentImage = () => 
      this.store.delete$(this.data.currentImage.id).subscribe(this.dialogRef.close);
    
    private downloadImage = () => 
      this.downloaderService.downloadUrl(this.data.currentImage.fileURL)
    
    private openConfirmDeleteDialog = () => {  
      let config: ConfirmDialogConfig = {message: 'Slett bilde?', confirmText: 'Slett'};
      const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
      deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteCurrentImage());
    }
  
}
