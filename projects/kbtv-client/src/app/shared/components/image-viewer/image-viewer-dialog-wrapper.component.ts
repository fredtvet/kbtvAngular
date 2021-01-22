import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DownloaderService } from '@core/services/downloader.service';
import { _appFileUrl } from '@shared-app/helpers/app-file-url.helper';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { ConfirmDialogService } from 'confirm-dialog';
import { ImageViewerDialogWrapperConfig } from './image-viewer-dialog-wrapper-config.const';

@Component({
  selector: 'app-image-viewer-dialog-wrapper',
  template: `
  <app-image-viewer
    [images]="cfg.images" 
    [currentImage]="cfg.currentImage"
    [actions]="actions"
    (currentImageChanged)="cfg.currentImage = $event"
    (closed)="close()">
  </app-image-viewer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ImageViewerDialogWrapperComponent {

  actions: AppButton[];

  constructor( 
    private confirmService: ConfirmDialogService,
    private downloaderService: DownloaderService,
    private dialogRef: MatDialogRef<ImageViewerDialogWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public cfg: ImageViewerDialogWrapperConfig
    ) {
      this.actions = [{text: "Last ned bilde", icon: "cloud_download", callback: this.downloadImage}]
      if(cfg.deleteAction) this.actions.push({
        text: "Slett bilde", icon: "delete", 
        callback: this.openConfirmDeleteDialog, 
        allowedRoles: this.cfg.deleteAction?.allowedRoles
      })
    }

    close = () => this.dialogRef.close();
    
    private deleteCurrentImage(): void{
      this.dialogRef.close();
      this.cfg.deleteAction?.callback(<string> this.cfg.currentImage.id)
    }
    
    private downloadImage = () => 
      this.cfg.currentImage?.fileName ? 
      this.downloaderService.downloadUrl(_appFileUrl(this.cfg.currentImage.fileName, "images")) : null
    
    private openConfirmDeleteDialog = () => {  
      this.confirmService.open({
        title: 'Slett bilde?', 
        confirmText: 'Slett',
        confirmCallback: () => this.deleteCurrentImage()
      });
    }
  
}
