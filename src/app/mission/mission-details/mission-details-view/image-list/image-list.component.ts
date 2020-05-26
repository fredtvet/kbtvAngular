import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { MatDialog, MatBottomSheet } from "@angular/material";
import { filter } from "rxjs/operators";
import { MissionImage } from "src/app/shared/models";
import { ConfirmDialogComponent } from "src/app/shared/components";
import { ImageViewerDialogComponent } from "src/app/mission/components/image-viewer-dialog/image-viewer-dialog.component";
import { Roles } from "src/app/shared/enums";
import { MailImageSheetComponent } from '../mail-image-sheet/mail-image-sheet.component';

@Component({
  selector: "app-image-list",
  templateUrl: "./image-list.component.html",
  styleUrls: ["./image-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListComponent {
  Roles = Roles;

  @Input() images: MissionImage[];
  @Output() imageDeleted = new EventEmitter();

  unloadedThumbnails: any[] = [];
  reloadThumbnailsState: boolean = false;
  reloadInterval: any;

  selectedImageIds: number[] = [];
  associativeIds: number[] = [];

  disableImageViewer: boolean = false; //Workaround to prevent ghost clicks on images

  constructor(
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet ) {}

  openMailImageSheet = () => {
    let botRef = this._bottomSheet.open(MailImageSheetComponent, {
      data: { ids: this.selectedImageIds },
    });
    botRef
      .afterDismissed()
      .pipe(filter((isSent) => isSent))
      .subscribe(x => {
        this.associativeIds = [];
        this.selectedImageIds = [];
      });
  };

  selectOrRemoveImage(image: MissionImage) {
    this.disableImageViewer = true;
    if (!this.associativeIds[image.id]) this.addToIdArrays(image.id)
    else this.removeFromIdArrays(image.id);
    //Using timeout to prevent ghost clicks
    setTimeout(() => (this.disableImageViewer = false), 500);
  }

  //Reloads thumbnail (thumbnails made async on server) until no error
  unloadedThumbnail(img) {
    //Add image to array if no exist
    let existingImg = this.unloadedThumbnails.find((val) => val.img == img);

    if (!existingImg) this.unloadedThumbnails.push({ img: img, retries: 1 });
    else if (existingImg.retries > 10) return null;
    else {
      this.unloadedThumbnails = this.unloadedThumbnails.map((val) => {
        if (val.img == img) {
          existingImg.retries++;
          return existingImg;
        } else return val;
      });
    }

    //Set reload interval if reload state is false
    if (!this.reloadThumbnailsState) {
      this.reloadThumbnailsState = true;
      this.reloadInterval = setInterval(() => this.reloadThumbnails(), 1500);
    }
  }

  loadedThumbnail(img) {
    this.unloadedThumbnails = this.unloadedThumbnails.filter(
      (val) => val.img != img
    );
  }

  reloadThumbnails() {
    //Reload image src to retry
    this.unloadedThumbnails.forEach((thumbnail) => {
      if (thumbnail.retries <= 10) thumbnail.img.src = thumbnail.img.src;
    });

    //Remove interval & set state to false when no unloaded thumbnails to reset
    if (this.unloadedThumbnails.length == 0) {
      clearInterval(this.reloadInterval);
      this.reloadThumbnailsState = false;
    }
  }

  openImageViewer(imageId: number) {
    if (this.disableImageViewer || this.associativeIds[imageId])
      return undefined;
    const dialogRef = this.dialog.open(ImageViewerDialogComponent, {
      width: "100%",
      height: "100%",
      panelClass: "image_viewer_dialog",
      data: { imageId: imageId, images: this.images },
    });

    dialogRef.afterClosed().subscribe((id) => {
      if (id > 0) {
        const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: "Bekreft at du ønsker å slette bildet",
        });
        deleteDialogRef
          .afterClosed()
          .pipe(filter((res) => res))
          .subscribe((res) => this.imageDeleted.emit(id));
      }
    });
  }

  trackById(index: number, image: any): number {
    return image.id;
  }

  private addToIdArrays(id:number){
    this.selectedImageIds.push(id);
    this.associativeIds[id] = id;
  }

  private removeFromIdArrays(id:number){
    this.selectedImageIds = this.selectedImageIds.filter((x) => x !== id );
    delete this.associativeIds[id];
  }
}
