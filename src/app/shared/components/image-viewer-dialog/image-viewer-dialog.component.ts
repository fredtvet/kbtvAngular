import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MissionImage } from '../../models/mission-image.model';
import { Roles } from '../../enums/roles.enum';
import { MatBottomSheet } from '@angular/material';
import { SubscriptionComponent } from '../abstracts/subscription.component';
import { BottomSheetMenuComponent } from '../bottom-sheet-menu/bottom-sheet-menu.component';
import { AppButton } from '../../interfaces/app-button.interface';

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
  styleUrls: ['./image-viewer-dialog.component.scss']
})

export class ImageViewerDialogComponent extends SubscriptionComponent {
  public Roles = Roles;
  toolbarHidden = false;

  private bottomSheetButtons: AppButton[];

  public currentImage: MissionImage;
  public index: number;
  public images: MissionImage[];

  constructor(
    private dialogRef: MatDialogRef<ImageViewerDialogComponent>,
    private _bottomSheet: MatBottomSheet,
    @Inject(MAT_DIALOG_DATA) private data: any,     
  ){ super(); };

  ngOnInit() {
    this.bottomSheetButtons = [
      {text: "Last ned bilde", icon: "cloud_download", callback: this.downloadImage},
      {text: "Last ned alle", icon: "cloud_download", callback: this.downloadImages},
      {text: "Slett bilde", icon: "delete", callback: this.deleteImage, allowedRoles: [Roles.Leder]}
    ];

    this.images = this.data.images;
    this.index = this.images.findIndex(x => x.id == this.data.imageId);
    this.currentImage = this.images[this.index];
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

  openBottomSheet = () => this._bottomSheet.open(BottomSheetMenuComponent, { data: this.bottomSheetButtons });
  
  private deleteImage = () => {
    this.dialogRef.close(this.currentImage.id);
  }

  private downloadImage = () => {
    window.open(this.currentImage.fileURL)
  }

  private downloadImages = () => {
    this.images.forEach(x => {
      window.open(x.fileURL)
    });
  }

}
