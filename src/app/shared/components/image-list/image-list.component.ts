import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImageViewerDialogComponent } from '../image-viewer-dialog/image-viewer-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MissionImage } from '../../models/mission-image.model';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent extends SubscriptionComponent {
  @Input() images: MissionImage[];
  @Output() imageDeleted = new EventEmitter();

  unloadedThumbnails: any[] = [];
  reloadThumbnailsState: boolean = false;
  reloadInterval: any;

  constructor(public dialog: MatDialog) { super() }

  //Reloads thumbnail (thumbnails made async) until no error
  unloadedThumbnail(img){
    //Add image to array if no exist
    let existingImg = this.unloadedThumbnails.find(val => val.img == img);

    if(!existingImg) this.unloadedThumbnails.push({img: img, retries: 1});
    else if(existingImg.retries > 10) return null;
    else{
      this.unloadedThumbnails = this.unloadedThumbnails.map(val => {
        if(val.img == img){
          existingImg.retries++;
          return existingImg
        }else return val
      })
    }

    //Set reload interval if reload state is false
    if(!this.reloadThumbnailsState){
      this.reloadThumbnailsState = true;
      this.reloadInterval = setInterval(() => this.reloadThumbnails(), 1500);
    }
  }

  reloadThumbnails(){
    //Reload image src to retry
    this.unloadedThumbnails.forEach((thumbnail) =>{
      if(thumbnail.retries <= 10) thumbnail.img.src = thumbnail.img.src;
    });

    //Remove interval & set state to false when no unloaded thumbnails to reset
    if(this.unloadedThumbnails.length == 0){
        clearInterval(this.reloadInterval);
        this.reloadThumbnailsState = false;
    }
  }

  loadedThumbnail(img){
    this.unloadedThumbnails = this.unloadedThumbnails.filter(val => val.img != img);
  }

  openImageViewer(imageId: number){

    const dialogRef = this.dialog.open(ImageViewerDialogComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'image_viewer_dialog',
      data: { imageId: imageId, images: this.images }
    });

    dialogRef.afterClosed().subscribe(id => {
      if(id > 0){
        const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette bildet'});
        deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.imageDeleted.emit(id));
      }
    });

  }

  trackById(index:number, image:any): number {
    return image.id;
  }
}
