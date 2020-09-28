import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelFile } from 'src/app/core/models';
import { DownloaderService } from 'src/app/core/services/downloader.service';
import { ConfirmDialogService } from 'src/app/core/services/ui/confirm-dialog.service';
import { Roles } from 'src/app/shared-app/enums';
import { _appFileUrl } from 'src/app/shared-app/helpers/app-file-url.helper';
import { MissionImageListStore } from '../mission-image-list.store';

@Component({
  selector: 'app-timesheet-card-dialog-wrapper',
  template: `
  <app-image-viewer
    [images]="data.images" 
    [currentImage]="data.currentImage"
    [actions]="actions"
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
    private confirmService: ConfirmDialogService,
    private downloaderService: DownloaderService,
    private store: MissionImageListStore,
    private dialogRef: MatDialogRef<ImageViewerDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {images: ModelFile[], currentImage: ModelFile}
    ) {}

    close = () => this.dialogRef.close();
    
    private deleteCurrentImage(): void{
      this.dialogRef.close();
      this.store.delete({id: this.data.currentImage.id});
    }
    
    private downloadImage = () => 
      this.downloaderService.downloadUrl(_appFileUrl(this.data.currentImage.fileName, "images"))
    
    private openConfirmDeleteDialog = () => {  
      this.confirmService.open({
        message: 'Slett bilde?', confirmText: 'Slett',
        confirmCallback: () => this.deleteCurrentImage()
      });
    }
  
}
