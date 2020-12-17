import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelFile } from '@core/models';
import { DownloaderService } from '@core/services/downloader.service';
import { ConfirmDialogService } from 'src/app/modules/confirm-dialog/confirm-dialog.service';
import { Roles } from '@shared-app/enums';
import { _appFileUrl } from '@shared-app/helpers/app-file-url.helper';
import { MissionImageListFacade } from '../mission-image-list.facade';

@Component({
  selector: 'app-timesheet-card-dialog-wrapper',
  template: `
  <app-image-viewer
    [images]="data.images" 
    [currentImage]="data.currentImage"
    [actions]="actions"
    (currentImageChanged)="data.currentImage = $event"
    (closed)="close()">
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
    private facade: MissionImageListFacade,
    private dialogRef: MatDialogRef<ImageViewerDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {images: ModelFile[], currentImage: ModelFile}
    ) {}

    close = () => this.dialogRef.close();
    
    private deleteCurrentImage(): void{
      this.dialogRef.close();
      this.facade.delete({id: this.data.currentImage.id});
    }
    
    private downloadImage = () => 
      this.data.currentImage?.fileName ? 
      this.downloaderService.downloadUrl(_appFileUrl(this.data.currentImage.fileName, "images")) : null
    
    private openConfirmDeleteDialog = () => {  
      this.confirmService.open({
        title: 'Slett bilde?', 
        confirmText: 'Slett',
        confirmCallback: () => this.deleteCurrentImage()
      });
    }
  
}
