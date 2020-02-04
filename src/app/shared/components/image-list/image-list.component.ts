import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImageViewerDialogComponent } from '../image-viewer-dialog/image-viewer-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MissionImage } from '../../models/mission-image.model';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  @Input() images: MissionImage[];
  @Output() imageDeleted = new EventEmitter();

  unloadedThumbnails: any[] = [];
  reloadThumbnailsState: boolean = false;
  reloadInterval: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  //Reloads thumbnail (thumbnails made async) until no error
  unloadedThumbnail(img){
    //Add image to array if no exist
    if(this.unloadedThumbnails.filter(val => val == img).length == 0){
      this.unloadedThumbnails.push(img);
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
      thumbnail.src = thumbnail.src;
    });

    //Remove interval & set state to false when no unloaded thumbnails to reset
    if(this.unloadedThumbnails.length == 0){
        clearInterval(this.reloadInterval);
        this.reloadThumbnailsState = false;
    }
  }

  loadedThumbnail(img){
    this.unloadedThumbnails = this.unloadedThumbnails.filter(val => val != img);
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
        const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

        deleteDialogRef.afterClosed().subscribe(res => {
          if(res) this.imageDeleted.emit(id);
        });
      }
    });

  }

  trackById(index:number, image:any): number {
    return image.id;
  }

  ngOnChanges(){console.log(this.images)}
}
