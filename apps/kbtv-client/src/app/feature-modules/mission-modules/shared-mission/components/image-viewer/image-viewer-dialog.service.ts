import { Injectable } from "@angular/core";
import { AppDialogService } from "@core/services/app-dialog.service";
import { map } from "rxjs/operators";
import { ImageViewerDialogWrapperConfig } from "./image-viewer-dialog-wrapper-config.const";
import { ImageViewerDialogWrapperComponent } from "./image-viewer-dialog-wrapper.component";

@Injectable({providedIn: "root"})
export class ImageViewerDialogService {

    constructor(private dialogService: AppDialogService){}

    open(config: ImageViewerDialogWrapperConfig): void { 
        this.dialogService.dialog$.pipe(
            map(dialog => dialog.open(ImageViewerDialogWrapperComponent, {
                width: "100%",
                height: "100%",
                panelClass: "image_viewer_dialog",
                data: config
            })), 
        ).subscribe();
    }
}