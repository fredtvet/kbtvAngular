import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MissionImage } from '../../models/mission-image.model';
import { NavAction } from '../nav-action.model';
import { ROLES } from '../../roles.enum';

@Component({
  selector: 'app-image-viewer-dialog',
  animations: [
    trigger('showHideToolbar', [
      state('show', style({
        top:'0px'
      })),
      state('hide', style({
        top:'-56px'
      })),
      transition('show => hide', [
        animate('.1s ease-out')
      ]),
      transition('hide => show', [
        animate('.1s ease-in',)
      ]),
    ]),
    trigger('showHideCounter', [
      state('show', style({
        bottom:'0px'
      })),
      state('hide', style({
        bottom:'-56px'
      })),
      transition('show => hide', [
        animate('.1s ease-out')
      ]),
      transition('hide => show', [
        animate('.1s ease-in',)
      ]),
    ])
  ],
  templateUrl: './image-viewer-dialog.component.html',
  styleUrls: ['./image-viewer-dialog.component.css']
})
export class ImageViewerDialogComponent implements OnInit {
  public ROLES = ROLES;
  toolbarHidden = false;

  public currentImage: MissionImage;
  public index: number;
  public images: MissionImage[];

  public actions: NavAction[] = [
    new NavAction("downloadImage", "Last ned bilde", "cloud_download"),
    new NavAction("downloadImages", "Last ned alle", "cloud_download"),
    new NavAction("delete", "Slett bilde", "delete_forever", [ROLES.Leder]),
  ];

  constructor(
    public dialogRef: MatDialogRef<ImageViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.images = this.data.images;
    this.index = this.images.findIndex(x => x.id == this.data.imageId);
    this.currentImage = this.images[this.index];
  }

  handleEvent(e){
    switch(e){
      case "delete":{
        this.dialogRef.close(this.currentImage.id);
        break;
      }
      case "downloadImage":{
        e.preventDefault();
        window.open(this.currentImage.fileURL)
        break;
      }
      case "downloadImages":{
        this.images.forEach(x => {
          window.open(x.fileURL)
        });
        break;
      }
    }
  }

  nextImage(){
    if(this.index >= this.images.length - 1) return null;
    this.index++
    this.currentImage = this.images[this.index];
  }

  previousImage(){
    if(this.index <= 0) return null
    this.index--;
    this.currentImage = this.images[this.index];
  }

  toggleToolBar(){
    this.toolbarHidden = !this.toolbarHidden;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
