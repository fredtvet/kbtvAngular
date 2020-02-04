import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MissionImage } from '../../models/mission-image.model';
import { NavAction } from '../nav-action.model';
import { ROLES } from '../../roles.enum';
import { VertMenuParentExtension } from '../vert-menu/vert-menu-parent.extension';

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
export class ImageViewerDialogComponent extends VertMenuParentExtension {
  public ROLES = ROLES;
  toolbarHidden = false;

  public currentImage: MissionImage;
  public index: number;
  public images: MissionImage[];

  constructor(
    public dialogRef: MatDialogRef<ImageViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { super(); }

  ngOnInit() {
    this.images = this.data.images;
    this.index = this.images.findIndex(x => x.id == this.data.imageId);
    this.currentImage = this.images[this.index];

    this.vertActions = [
      new NavAction("Last ned bilde", "cloud_download", "downloadImage", this.downloadImage),
      new NavAction("Last ned alle", "cloud_download", "downloadImages", this.downloadImages),
      new NavAction("Slett bilde", "delete_forever", "delete", this.deleteImage, [ROLES.Leder]),
    ];
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

  deleteImage(e:string, ctx:any){
    ctx.dialogRef.close(ctx.currentImage.id);
  }

  downloadImage(e:string, ctx:any){
    window.open(ctx.currentImage.fileURL)
  }

  downloadImages(e:string, ctx:any){
    ctx.images.forEach(x => {
      window.open(x.fileURL)
    });
  }

}
